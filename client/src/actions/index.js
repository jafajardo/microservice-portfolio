import axios from 'axios';
import {
  SIGNUP,
  SIGNIN,
  ERROR,
  CURRENT_USER,
  SIGNOUT,
  RETRIEVE_PORTFOLIOS,
  RETRIEVE_SPECIFIC_PORTFOLIO,
  RETRIEVE_HOLDINGS,
  CLEAR_HOLDINGS,
  RETRIEVE_SHARE_STAT,
  CLEAR_SHARE_STAT,
  CREATE_TRADE,
  CLEAR_TRADE,
  RETRIEVE_TRADES,
} from './types';
import history from '../history';

const delay = (ms) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });

      await delay(200);
      // Initialise req.currentUser object
      await axios.get('/api/users/currentuser');

      await delay(1000);
      // Use req.currentUser to retrieve portfolios
      let portfolios = null;
      let count = 0;
      while (!portfolios && count < 3) {
        portfolios = await axios.get('/api/portfolios');
        count += 1;
      }

      const defaultPortfolio = portfolios?.data.find(
        (p) => p.isDefault && p.isActive
      );

      dispatch({
        type: SIGNUP,
        payload: { ...response.data, currentPortfolio: defaultPortfolio },
      });

      // if (defaultPortfolio) {
      //   history.push(`/portfolio/${defaultPortfolio.id}`);
      // }

      history.push('/dashboard');
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/users/signin', {
        email,
        password,
      });

      if (process.env.NODE_ENV === 'DEV') {
        console.log(response.data);
      }

      await delay(200);
      // Initialise req.currentUser object
      await axios.get('/api/users/currentuser');

      await delay(1000);
      // Use req.currentUser to retrieve portfolios
      let portfolios = null;
      let count = 0;
      while (!portfolios && count < 3) {
        portfolios = await axios.get('/api/portfolios');
        count += 1;
      }

      const defaultPortfolio = portfolios?.data.find(
        (p) => p.isDefault && p.isActive
      );

      dispatch({
        type: SIGNIN,
        payload: { ...response.data, currentPortfolio: defaultPortfolio },
      });

      // if (defaultPortfolio) {
      //   history.push(`/portfolio/${defaultPortfolio.id}`);
      // }

      history.push('/dashboard');
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

export const currentUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/users/currentuser');
      let defaultPortfolio = null;

      if (response.data && response.data.currentUser) {
        const portfolios = await axios.get('/api/portfolios');
        if (portfolios) {
          defaultPortfolio = portfolios?.data.find(
            (p) => p.isDefault && p.isActive
          );
        }
      }

      dispatch({
        type: CURRENT_USER,
        payload: { ...response.data, currentPortfolio: defaultPortfolio },
      });
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    try {
      await axios.post('/api/users/signout');
      dispatch({ type: SIGNOUT });
      dispatch({ type: CLEAR_HOLDINGS });
      dispatch({ type: CLEAR_SHARE_STAT });
      dispatch({ type: CLEAR_TRADE });
      history.push('/');
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

export const retrieveSpecificPortfolio = (portfolioId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/portfolios/${portfolioId}`);
      dispatch({ type: RETRIEVE_SPECIFIC_PORTFOLIO, payload: response.data });
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

export const retrievePortfolios = () => {
  return async (dispatch) => {
    try {
      const portfolios = await axios.get('/api/portfolios');
      dispatch({ type: RETRIEVE_PORTFOLIOS, payload: portfolios.data });
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

export const retrieveHoldings = (portfolioId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/api/holdings?portfolioId=${portfolioId}`
      );

      dispatch({ type: RETRIEVE_HOLDINGS, payload: response.data });
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

export const retrieveShareStat = (symbol) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/sharestats/${symbol}`);

      dispatch({
        type: RETRIEVE_SHARE_STAT,
        payload: { [symbol]: response.data },
      });
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

export const createTrade = (trade) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/trades', {
        portfolioId: trade.portfolioId,
        symbol: trade.symbol,
        date: trade.date,
        tradeType: trade.tradeType,
        quantity: trade.quantity,
        sharePrice: trade.sharePrice,
        brokerage: trade.brokerage,
        currency: trade.currency,
      });

      dispatch({
        type: CREATE_TRADE,
        payload: { [trade.symbol]: response.data },
      });

      history.push(`/portfolio/${trade.portfolioId}`);
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

export const retrieveTrades = (symbol, portfolioId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/api/trades?symbol=${symbol}&portfolioId=${portfolioId}`
      );

      dispatch({ type: RETRIEVE_TRADES, payload: response.data });
    } catch (err) {
      dispatch({ type: ERROR, payload: err.response.data });
    }
  };
};

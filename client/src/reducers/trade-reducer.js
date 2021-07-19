import {
  CREATE_TRADE,
  CLEAR_TRADE,
  RETRIEVE_TRADES,
  UPDATE_TRADE,
} from '../actions/types';

const INITIAL_STATE = {};

// State is arranged using the holding's symbol (e.g. BHP) as KEY
// and the value as array of objects (each object is a TRADE)

// "BHP": [
//   {
//       "tradeType": "buy",
//       "currency": "AUD",
//       "symbol": "BHP",
//       "date": "2020-03-18T00:00:00.000Z",
//       "quantity": 50,
//       "sharePrice": 36,
//       "brokerage": 14.95,
//       "portfolio": "60f4eae8bc293e002bd091ca",
//       "id": "60f4eb0524a81b00297c72f4"           <<<<=== tradeId
//   }
// ]

const tradeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TRADE: {
      const key = Object.keys(action.payload)[0];
      const value = Object.values(action.payload)[0];
      const data = state[key];
      if (!data) {
        return { ...state, [key]: [value] };
      } else {
        return { ...state, [key]: [...state[key], value] };
      }
    }
    case RETRIEVE_TRADES: {
      const key = Object.keys(action.payload)[0];
      const value = Object.values(action.payload)[0];
      return { ...state, [key]: [...value] };
    }
    case UPDATE_TRADE: {
      const key = Object.keys(action.payload)[0];
      const value = Object.values(action.payload)[0];
      // Retrieve value/values from state using key (trade symbol)
      const data = state[key];
      if (!data) {
        return { ...state, [key]: [value] };
      } else {
        // Find in the array of trades (data) this specific trade (using tradeId = id in DB)
        // and replace the trade in state with the update one.
        let existingTrade = data.find((t) => t.id === value.id);
        if (existingTrade) {
          existingTrade = value;
        }
        return { ...state };
      }
    }
    case CLEAR_TRADE:
      return {};
    default:
      return state;
  }
};

export default tradeReducer;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RequireAuth from './hoc/requireAuth';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Portfolio from './components/portfolio/Portfolio';
import NewHolding from './components/holding/New-Holding';
import HoldingDetails from './components/holding/Holding-Details';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route
        exact
        path="/portfolio/:portfolioId"
        component={RequireAuth(Portfolio)}
      />
      <Route
        exact
        path="/portfolio/:portfolioId/newHolding"
        component={RequireAuth(NewHolding)}
      />
      <Route
        exact
        path="/portfolio/:portfolioId/:symbol"
        component={RequireAuth(HoldingDetails)}
      />
    </Switch>
  );
};

export default App;

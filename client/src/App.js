import React from 'react';
import { Switch, Route } from 'react-router-dom';
import enhancedComponent from './hoc/requireAuth';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Portfolio from './components/portfolio/Portfolio';
import NewHolding from './components/holding/New-Holding';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route
        exact
        path="/portfolio/:portfolioId"
        component={enhancedComponent(Portfolio)}
      />
      <Route
        exact
        path="/portfolio/:portfolioId/newHolding"
        component={enhancedComponent(NewHolding)}
      />
    </Switch>
  );
};

export default App;

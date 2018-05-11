import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from '../pages/home/home';
import { NotFound } from '../ui/notFound/notFound';

export const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

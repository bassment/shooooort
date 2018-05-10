import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomeContainer } from '../pages/home/homeContainer';
import { NotFound } from '../ui/notFound/notFound';

export const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={HomeContainer}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

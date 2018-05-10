import { exampleReducers } from './example/example';
import { applicationReducers } from './application/application';

export const appReducers = Object.assign(
  {},
  exampleReducers,
  applicationReducers,
);

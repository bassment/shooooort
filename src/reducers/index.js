import { exampleReducers } from './example/example';
import { applicationReducers } from './application/application';
import { linkInputSectionReducers } from './home/linkInputSection/linkInputSection';
import { linkTableSectionReducers } from './home/linkTableSection/linkTableSection';

export const appReducers = Object.assign(
  {},
  exampleReducers,
  applicationReducers,
  linkInputSectionReducers,
  linkTableSectionReducers,
);

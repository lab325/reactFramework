import * as constants from './constants.js';
import {fromJS} from 'immutable';

export const dispatchSearchParams = (searchParams) => ({
  type: constants.SEARCH_PARAMS,
  searchParams: fromJS(searchParams)
});

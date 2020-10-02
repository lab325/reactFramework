import { fromJS } from "immutable";
import * as constants from './constants.js';


const defaultState =fromJS({
  searchParams: {}
});

export default (state=defaultState, action)=> {
  switch (action.type) {
    case constants.SEARCH_PARAMS:
      return state.set("searchParams", action.searchParams);
    default:
      return state
  }

}

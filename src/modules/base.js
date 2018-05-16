// 뷰, 검색 인풋 담당
import { createAction, handleActions } from 'redux-actions';
import { Map } from "immutable";
// action
const CHANGE_SEARCH = 'base/CHANGE_SEARCH';
const SET_VIEW = 'base/SET_VIEW';

// action creator
export const changeSearch = createAction(CHANGE_SEARCH); //keyword
export const setView = createAction(SET_VIEW); //view

const initialState = Map({
  keyword : '',
  view : 'favorite' // favorite, list
});

// reducers
export default handleActions({
  [CHANGE_SEARCH]: (state,action) => state.set('keyword',action.payload) ,
  [SET_VIEW] : (state,action) => state.set('view', action.payload)
}, initialState);
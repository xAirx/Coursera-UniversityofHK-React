import { SET_CURRENT_USER, LOGIN_LOADING } from '../Api/ActionTypes';

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export const Auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

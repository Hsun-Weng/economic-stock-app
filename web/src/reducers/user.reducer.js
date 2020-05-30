import userConstants from '../constants/user.constants';

export const user = (state={user: null}, action) =>{
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return {
        gettingUser: true,
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        user: action.user
      };
    case userConstants.GET_USER_FAILURE:
      return {
        error: action.error
      };
    case userConstants.CLEAR_USER:
      return {};
    default:
      return state
  }
}

export const login = (state={}, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}

export const signUp = (state={result: false}, action) => {
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      return {
        result: false,
        signningUp: true
      };
    case userConstants.SIGNUP_SUCCESS:
      return { 
        result: true,
      };
    case userConstants.SIGNUP_FAILURE:
      return {
        result: false,
        error: action.error
      };
    default:
      return state;
  }
}
import userConstants from '../constants/user.constants';

export const user = (state={}, action) =>{
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

export const signUp = (state={}, action) => {
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      return {
        signningUp: true
      };
    case userConstants.SIGNUP_SUCCESS:
      return {};
    case userConstants.SIGNUP_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
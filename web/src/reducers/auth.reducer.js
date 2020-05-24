import authConstants from '../constants/auth.constants';

export const auth = (state={}, action) =>{
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case authConstants.LOGOUT:
      return {};
    case authConstants.SIGNUP_REQUEST:
      return {
        signningUp: true
      };
    case authConstants.SIGNUP_SUCCESS:
      return {};
    case authConstants.SIGNUP_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
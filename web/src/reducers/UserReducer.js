import userConstants from '../constants/UserConstants';

export const user = (state={}, action) =>{
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
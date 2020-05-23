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
    default:
      return state
  }
}

import userConstants from '../constants/user.constants';

const userInitState = {
  loading: false,
  isLoggedIn: false,
  info: {
    email: null,
    firstName: null,
    lastName: null
  }
};

export const user = (state=userInitState, action) =>{
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return {...state,
        loading: true,
        isLoggedIn: false,
        info: {
          email: null,
          firstName: null,
          lastName: null
        }
      };
    case userConstants.GET_USER_SUCCESS:
      return {...state,
        loading: false, 
        isLoggedIn: true,
        info: action.user,
      }
    case userConstants.GET_USER_FAILURE:
      return {...state,
        loading: false,
        isLoggedIn: false,
        info: {
          email: null,
          firstName: null,
          lastName: null
        }
      };
    case userConstants.REMOVE_USER:
      return {...state,
        loading: false,
        isLoggedIn: false,
        info: {
          email: null,
          firstName: null,
          lastName: null
        }
      };
    default:
      return state;
  }
}
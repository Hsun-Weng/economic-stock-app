import userConstants from '../constants/user.constants';

const userInitState = {
  error: null,
  loading: false,
  data: null
};

export const user = (state=userInitState, action) =>{
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return {...state,
        loading: true,
        data: null 
      };
    case userConstants.GET_USER_SUCCESS:
      return {...state,
        loading: true, 
        data: action.user
      }
    case userConstants.GET_USER_FAILURE:
      return {...state,
        error: action.error,
        data: null
      };
    case userConstants.LOGOUT:
      return {...state,
        data: null
      };
    default:
      return state;
  }
}

const loginInitState = {
  error: null,
  loading: false
}

export const login = (state=loginInitState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {...state,
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {...state,
        loading: false,
        error: null
      };
    case userConstants.LOGIN_FAILURE:
      return {...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

const signUpInitState = {
  error: null,
  loading: false,
  result: false
}

export const signUp = (state=signUpInitState, action) => {
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      return {...state,
        loading: true
      };
    case userConstants.SIGNUP_SUCCESS:
      return {...state,
        loading: false,
        result: true,
        error: null
      };
    case userConstants.SIGNUP_FAILURE:
      return {...state,
        result: false,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
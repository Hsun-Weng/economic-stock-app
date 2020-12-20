import userConstants from '../constants/user.constants';

const userInitState = {
  loading: false,
  data: null
};

export const user = (state=userInitState, action) =>{
  switch (action.type) {
    case userConstants.GET_USER_REQUEST:
      return {...state,
        loading: true,
        data: null,
      };
    case userConstants.GET_USER_SUCCESS:
      return {...state,
        loading: false, 
        data: action.user,
      }
    case userConstants.GET_USER_FAILURE:
      return {...state,
        loading: false,
        data: null,
      };
    case userConstants.LOGOUT:
      return {...state,
        loading: false,
        data: null,
      };
    default:
      return state;
  }
}

const loginInitState = {
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
      };
    case userConstants.LOGIN_FAILURE:
      return {...state,
        loading: false,
      };
    default:
      return state;
  }
}

const signUpInitState = {
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
        result: true
      };
    case userConstants.SIGNUP_FAILURE:
      return {...state,
        result: false,
        loading: false
      };
    default:
      return state;
  }
}

const oauthLoginInitState = {
  loading: false
}

export const oauthLogin = (state=oauthLoginInitState, action) => {
  switch (action.type) {
    case userConstants.OAUTH_LOGIN_REQUEST:
      return {...state,
        loading: true,
      };
    case userConstants.OAUTH_LOGIN_SUCCESS:
      return {...state,
        loading: false,
      };
    case userConstants.OAUTH_LOGIN_FAILURE:
      return {...state,
        loading: false,
      };
    default:
      return state;
  }
}
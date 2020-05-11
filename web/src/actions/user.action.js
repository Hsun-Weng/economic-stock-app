import userConstants from '../constants/UserConstants';
import userService from '../services/user.service';

export const userActions = {
    login,
    logout,
    regiseter,
    getAll,
    delete: _delet
}

const login = (email, password) => {
    return dispatch => {
        dispatch(request({ email }));
        
        userService.login(email, password)
            .then(user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    const request = (user) => {
        return {type: userConstants.LOGIN_REQUEST, user};
    }
    const success = (user) => {
        return {type: userConstants.LOGIN_SUCCESS, user};
    }
    const failure = (error) => {
        return {type: userConstants.LOGIN_FAILURE, error};
    }
}

const logout = () => {
    userService.logout();
    return {type: userConstants.LOGOUT};
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    const request = (user) => { return { type: userConstants.REGISTER_REQUEST, user } }
    const success = (user) => { return { type: userConstants.REGISTER_SUCCESS, user } }
    const failure = (error) => { return { type: userConstants.REGISTER_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
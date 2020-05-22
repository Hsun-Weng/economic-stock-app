import userConstants from '../constants/user.constants';
import { userService } from '../services';

export const userActions = {
    login,
    logout,
    // regiseter,
    // getAll,
    // delete: _delet
}

function login(userName, password) {
    return dispatch => {
        dispatch(request({ userName }));
        
        userService.login(userName, password)
            .then(() => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }

    function request(user) {
        return {type: userConstants.LOGIN_REQUEST};
    }
    function success() {
        return {type: userConstants.LOGIN_SUCCESS};
    }
    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error};
    }
}

function logout() {
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

    function request (user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success (user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure (error) { return { type: userConstants.REGISTER_FAILURE, error } }
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
import userConstants from '../constants/user.constants';
import { userService } from '../services';
import { notificationActions } from './notification.action';

export const userActions = {
    getUser,
}
function getUser() {
    return dispatch => {
        dispatch(request());
        
        userService.getUser()
                .then(user=>{
                    dispatch(success(user));
                    dispatch(notificationActions.enqueueNotification({
                        message: 'Login Success',
                        options: {
                            key: new Date().getTime() + Math.random(),
                            variant: 'success',
                        },
                    }))
                },
                error=>{
                    dispatch(failure(error));
                })
    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}

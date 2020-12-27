import userConstants from '../constants/user.constants';
import { userService } from '../services';
import { portfolioAction } from './portfolio.action';

export const userAction = {
    getUser,
    removeUser
}
function getUser() {
    return dispatch => {
        dispatch(request());
    
        userService.getUser()
            .then(user=>{
                dispatch(success(user));
                dispatch(portfolioAction.getPortfolios());
            },
            error=>{
                dispatch(failure());
            })
        
    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure() { return { type: userConstants.GET_USER_FAILURE} }
}

function removeUser() {
    return dispatch =>{
        dispatch(remove());
    }
    function remove() { return { type: userConstants.REMOVE_USER } }
}

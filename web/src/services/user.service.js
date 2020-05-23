import { authHeader } from '../helplers/authHeader';

export const userService = {
    getUser,
}

function getUser(){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`/api/user`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}

const handleResponse = (httpResponse) => {
    return httpResponse.json().then(res => {
        if (!httpResponse.ok) {
            // if (httpResponse.status === 401) {
            //     logout();
            // }
            
            const error = res;
            return Promise.reject(error);
         }

        return res.data;
    });
} 

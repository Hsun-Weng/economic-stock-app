import { authHeader } from '../helplers/authHeader';

export const authService = {
    login,
    logout,
    signUp,
}

function login(userName, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password })
    };

    return fetch(`/api/user/login`, requestOptions)
        .then(handleResponse)
        .then(token => {
            localStorage.setItem('token', token);
        });
}

function logout(){
    localStorage.removeItem('token');
}

function signUp(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/api/user/signup`, requestOptions)
        .then(handleResponse);
}

const handleResponse = (httpResponse) => {
    return httpResponse.json().then(res => {
        if (!httpResponse.ok) {
            if (httpResponse.status === 401) {
                logout();
            }
            
            const error = res;
            return Promise.reject(error);
         }

        return res.data;
    });
} 

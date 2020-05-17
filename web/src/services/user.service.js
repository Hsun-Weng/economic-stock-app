import { authHeader } from '../helplers/authHeader';

export const userService = {
    login,
    logout,
    register,
    update
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
            return token;
    });
}

function logout(){
    localStorage.removeItem('token');
}

function register(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/user/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/user/${user.id}`, requestOptions).then(handleResponse);;
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
} 

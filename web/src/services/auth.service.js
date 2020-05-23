import { authHeader } from '../helplers/authHeader';

export const authService = {
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

    if(userName.length === 0 || password.length === 0 ){
        return Promise.reject({status: 0, message: "User Name And Password Can't Be Empty"})
    }

    return fetch(`/api/user/login`, requestOptions)
        .then(handleResponse)
        .then(token => {
            localStorage.setItem('token', token);
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

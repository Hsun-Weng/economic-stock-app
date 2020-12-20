export const userService = {
    getUser,
    login,
    signUp,
    logout,
    oauthLogin
}

function getUser(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/user`, requestOptions)
        .then(handleResponse)
}

function login(userName, password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password })
    };

    return fetch(`/api/user/login`, requestOptions);
}

function logout(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`/api/user/logout`, requestOptions);
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

function oauthLogin(providerCode, code){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerCode, code })
    };

    return fetch(`/api/user/oauth`, requestOptions)
        .then(handleResponse);
}

const handleResponse = (httpResponse) => {
    return httpResponse.json().then(res => {
        if (!httpResponse.ok) {
            const error = res;
            return Promise.reject(error);
         }

        return res.data;
    });
} 
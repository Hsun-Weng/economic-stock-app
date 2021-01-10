export const userService = {
    getUser,
}

function getUser(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/user`, requestOptions)
        .then((res)=>{
            if(!res.ok){
                return Promise.reject(res);
            }
            return res.json();
        });
}

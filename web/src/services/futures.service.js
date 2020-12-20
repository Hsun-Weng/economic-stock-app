
export const futuresService = {
    getFutures
}

function getFutures(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/futures`, requestOptions)
        .then(handleResponse)
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

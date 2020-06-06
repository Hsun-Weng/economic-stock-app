
export const economicService = {
    getEconomicData,
    getEconomicValue
}

function getEconomicData(countryCode){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/economic/${countryCode}/data`, requestOptions)
        .then(handleResponse)
}

function getEconomicValue(countryCode, dataId){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/economic/data/${countryCode}/${dataId}`, requestOptions)
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

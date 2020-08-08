
export const economicService = {
    getEconomicData,
    getEconomicValue,
    getEconomicChartData
}

function getEconomicData(countryCode){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/economic/${countryCode}/data`, requestOptions)
        .then(handleResponse)
}

function getEconomicValue(countryCode, dataCode){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/economic/${countryCode}/${dataCode}`, requestOptions)
        .then(handleResponse)
}

function getEconomicChartData(unitCode, data){
    return new Promise(function(resolve, reject) {
        switch(unitCode){
            case "TOTAL":
                resolve(data);
                break;
            case "CHANGE":
                resolve(convertChangeData(data));
                break;
            default:
                reject(`Can't found ${unitCode}`);
        }
    });

    function convertChangeData(data){
        let cloneData = Object.assign([], data); // copy data array
        let result = cloneData.sort(function(a, b){
            return a.date > b.date ? 1 : -1;
        }).map((detail, index)=>{
            if(index === 0){
                return null;
            }
            return {date: detail.date,
                value: (detail.value - cloneData[index-1].value)};
        });

        return result;
    }
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

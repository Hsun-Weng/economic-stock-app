
export const futuresService = {
    getFutures,
    getFuturesChip
}

function getFutures(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/futures/taiwan`, requestOptions)
        .then(handleResponse)
}

function getFuturesChip(futuresCode, investorCode, startDate, endDate){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/futures/taiwan/${futuresCode}/chip?investorCode=${investorCode}&startDate=${startDate}&endDate=${endDate}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data.map((investorChipData)=>{
                let chipData = investorChipData.investorChip.pop();
                chipData.openInterestNetLot = chipData.openInterestLongLot - chipData.openInterestShortLot;
                let percent = Math.round(( chipData.openInterestNetLot / investorChipData.openInterestLot ) * 100);
                return {...investorChipData, ...chipData, "percent": percent};
            })
        })
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

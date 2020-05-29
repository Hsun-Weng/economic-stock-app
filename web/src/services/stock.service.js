
export const stockService = {
    getCategories,
    getCategoryStocks,
    getStockPrices
}

function getCategories(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/stock/taiwan/categories`, requestOptions)
        .then(handleResponse)
}

function getCategoryStocks(categoryCode){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/stock/taiwan/category/${categoryCode}/stocks`, requestOptions)
        .then(handleResponse)
}

function getStockPrices(stockCode, startDate, endDate){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/stock/taiwan/${stockCode}?startDate=${startDate}&endDate=${endDate}`, requestOptions)
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

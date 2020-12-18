
export const stockService = {
    getAllStocks,
    getCategories,
    getCategoryStocks,
    getStockPrices,
    getStockIndex,
    getAllStockIndexes,
    getStockChip,
    getStockMargin,
    getStockRankPrices,
}

function getAllStocks(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/stocks`, requestOptions)
        .then(handleResponse)
}

function getCategories(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/categories`, requestOptions)
        .then(handleResponse)
}

function getCategoryStocks(categoryCode){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/category/${categoryCode}/stocks/prices`, requestOptions)
        .then(handleResponse)
}

function getStockPrices(stockCode, startDate, endDate){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/stock/${stockCode}/prices?startDate=${startDate}&endDate=${endDate}`, requestOptions)
        .then(handleResponse)
}

function getStockIndex(indexCode, startDate, endDate) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/stock/index/${indexCode}/prices?startDate=${startDate}&endDate=${endDate}`, requestOptions)
        .then(handleResponse)
}

function getAllStockIndexes(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/indexes`, requestOptions)
        .then(handleResponse)
}

function getStockChip(stockCode, startDate, endDate){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/stock/${stockCode}/chip?&startDate=${startDate}&endDate=${endDate}`, requestOptions)
        .then(handleResponse)
        .then((data)=>
            data.sort(function(a, b){
                return a.date > b.date ? -1 : 1;
            })
        )
}

function getStockMargin(stockCode, startDate, endDate){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/stock/${stockCode}/margin?&startDate=${startDate}&endDate=${endDate}`, requestOptions)
        .then(handleResponse)
        .then((data)=>
            data.sort(function(a, b){
                return a.date > b.date ? -1 : 1;
            })
        )
}

function getStockRankPrices(sortColumn, page, size, direction) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }

    return fetch(`/api/stocks/rank/latest?sortColumn=${sortColumn}&page=${page}&size=${size}&direction=${direction}`, requestOptions)
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

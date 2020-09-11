
export const stockService = {
    getAllStocks,
    getCategories,
    getCategoryStocks,
    getStockPrices,
    getStockIndex,
    getLatestStockPrice,
    getAllStockIndexes,
    getLatestStockIndexPrice,
    getStockChip,
    getStockMargin
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

    return fetch(`/api/category/${categoryCode}/stocks`, requestOptions)
        .then(handleResponse)
}

function getStockPrices(stockCode, startDate, endDate){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/stock/${stockCode}?startDate=${startDate}&endDate=${endDate}`, requestOptions)
        .then(handleResponse)
}

function getStockIndex(indexCode, startDate, endDate) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/data/stock/index/${indexCode}?startDate=${startDate}&endDate=${endDate}`, requestOptions)
        .then(handleResponse)
}

function getLatestStockPrice(products){
    let stockCodes = Object.assign([], products)
                    .filter((data)=>data.productType===1)
                    .map((data)=>data.productCode);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockCodes)
    };
    

    return fetch(`/data/stock/latest`, requestOptions)
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

function getLatestStockIndexPrice(products){
    let indexCodes = Object.assign([], products)
                    .filter((data)=>data.productType===0)
                    .map((data)=>data.productCode);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(indexCodes)
    };
    

    return fetch(`/data/stock/index/latest`, requestOptions)
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

const handleResponse = (httpResponse) => {
    return httpResponse.json().then(res => {
        if (!httpResponse.ok) {
            const error = res;
            return Promise.reject(error);
         }

        return res.data;
    });
} 

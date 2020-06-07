import { authHeader } from '../helplers/authHeader';

export const portfolioService = {
    getPortfolio,
    addPortfolio,
    getPortfolioProducts,
    addPortfolioProduct
}

function getPortfolio(){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`/api/portfolio`, requestOptions)
        .then(handleResponse)
}

function addPortfolio(portfolio){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolio)
    };

    return fetch(`/api/portfolio`, requestOptions)
        .then((httpResponse) => {
            if (!httpResponse.ok) {
                const error = httpResponse;
                return Promise.reject(error);
            }
        })
}

function addPortfolioProduct(portfolioProduct) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioProduct)
    };

    return fetch(`/api/portfolio/product`, requestOptions)
        .then((httpResponse) => {
            if (!httpResponse.ok) {
                const error = httpResponse;
                return Promise.reject(error);
            }
        })
}

function getPortfolioProducts(portfolioId) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`/api/portfolio/${portfolioId}/products`, requestOptions)
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
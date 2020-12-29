export const portfolioService = {
    getPortfolios,
}

/**
 * 取得投資組合
 */
function getPortfolios(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`/api/portfolio`, requestOptions)
        .then((res)=>{
            if(!res.ok){
                return Promise.reject(res);
            }
            return res.json();
        });
}

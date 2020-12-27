import React from 'react';
import { Children } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import StockTreeMapView from './views/StockTreeMap';
import EconomicDataView from './views/EconomicDataView';
import FuturesChipView from './views/FuturesChipView';
import StockCategoryView from './views/StockCategoryView';
import CategoryStocksView from './views/CategoryStocksView';
import StockRankView from './views/StockRankView';
import PortfolioView from './views/PortfolioView';
import StockView from './views/StockView';
import StockIndexView from './views/StockIndexView';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import OauthRedirect from './views/OauthRedirect';

const routes = [
    {
        path: 'app',
        element: <DashboardLayout />,
        children: [
            { path: '/', element: <StockTreeMapView /> },
            { path: '/economic', element: <EconomicDataView /> },
            { path: '/futures/chip', element: <FuturesChipView />},
            { path: '/stock/category', element: <StockCategoryView />},
            { path: '/stock/category/:categoryCode', element: <CategoryStocksView />},
            { path: '/stock/rank', element: <StockRankView />},
            { path: '/portfolio', element: <PortfolioView />},
            { path: '/stock/:stockCode', element: <StockView />},
            { path: '/stock/index/:indexCode', element: <StockIndexView />}
        ]
    },{
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'login', element: <LoginView /> },
            { path: 'register', element: <SignUpView /> },
            // { path: '404', element: <NotFoundView /> },
            { path: '/', element: <Navigate to="/app" /> },
            { path: '/oauth/:providerCode', element: <OauthRedirect />}
            // { path: '*', element: <Navigate to="/404" /> }
        ]
    }

]

export default routes;
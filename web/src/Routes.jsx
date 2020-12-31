import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import CategoryStocksView from './views/CategoryStocksView';
import EconomicDataView from './views/EconomicDataView';
import FuturesChipView from './views/FuturesChipView';
import LoginView from './views/LoginView';
import OauthFacebookRedirect from './views/OauthFacebookRedirect';
import PortfolioView from './views/PortfolioView';
import SignUpView from './views/SignUpView';
import StockCategoryView from './views/StockCategoryView';
import StockIndexView from './views/StockIndexView';
import StockRankView from './views/StockRankView';
import StockTreeMapView from './views/StockTreeMap';
import StockView from './views/StockView';
import NotFoundView from './views/NotFoundView';

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
            { path: '/stock/index/:indexCode', element: <StockIndexView />},
            { path: '*', element: <Navigate to="/404" /> }
        ]
    },{
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'login', element: <LoginView /> },
            { path: 'register', element: <SignUpView /> },
            // { path: '404', element: <NotFoundView /> },
            { path: '/', element: <Navigate to="/app" /> },
            { path: '404', element: <NotFoundView /> },
            { path: '/oauth/facebook', element: <OauthFacebookRedirect />},
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }

]

export default routes;
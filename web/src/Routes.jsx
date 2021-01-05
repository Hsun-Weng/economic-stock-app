import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import CategoryStocksView from './views/CategoryStocksView';
import EconomicDataView from './views/EconomicDataView';
import FuturesChipView from './views/FuturesChipView';
import LoginView from './views/LoginView';
import UserInfoView from './views/UserInfoView';
import NotFoundView from './views/NotFoundView';
import OauthFacebookRedirect from './views/OauthFacebookRedirect';
import PortfolioView from './views/PortfolioView';
import PorftolioProductsView from './views/PortfolioProductsView';
import SignUpView from './views/SignUpView';
import StockCategoryView from './views/StockCategoryView';
import StockIndexView from './views/StockIndexView';
import StockRankView from './views/StockRankView';
import StockTreeMapView from './views/StockTreeMap';
import StockView from './views/StockView';

const routes = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            { path: '/', element: <StockTreeMapView /> },
            { path: '/login', element: <LoginView /> },
            { path: '/register', element: <SignUpView /> },
            { path: '/user/info', element: <UserInfoView /> },
            { path: '/oauth/facebook', element: <OauthFacebookRedirect />},
            { path: '/economic', element: <EconomicDataView /> },
            { path: '/futures/chip', element: <FuturesChipView />},
            { path: '/stock/category', element: <StockCategoryView />},
            { path: '/stock/category/:categoryCode', element: <CategoryStocksView />},
            { path: '/stock/rank', element: <StockRankView />},
            { path: '/portfolio', element: <PortfolioView />},
            { path: '/portfolio/:portfolioId', element: <PorftolioProductsView />},
            { path: '/stock/:stockCode', element: <StockView />},
            { path: '/stock/index/:indexCode', element: <StockIndexView />},
            { path: '/404', element: <NotFoundView to="/404" /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
]

export default routes;
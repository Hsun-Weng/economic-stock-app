import React from 'react';
import { Children } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import EconomicDataView from './views/EconomicDataView';
import FuturesChipView from './views/FuturesChipView';

const routes = [
    {
        path: 'app',
        element: <DashboardLayout />,
        children: [
            { path: '/', element: <EconomicDataView /> },
            { path: '/futuresChip', element: <FuturesChipView />} 
        ]
    }

]

export default routes;
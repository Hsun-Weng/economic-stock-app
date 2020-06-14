import React from 'react';
import { Route } from 'react-router-dom';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccessibleIcon from '@material-ui/icons/Accessible'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import Dashbaord from './components/Dashboard'
import EconomicData from './components/EconomicData';
import StockChart from './components/StockChart';
import StockIndexChart from './components/StockIndexChart';

import FuturesChip from './components/taiwan-stock/FuturesChip';
import FuturesChart from './components/taiwan-stock/FuturesChart';

import Portfolio from './components/Portfolio';

export const mainItemRoutes = [
    {
        path: '/',
        itemName: 'Dashboard',
        icon: DashboardIcon,
        component: Dashbaord,
        exact: true,
        itemType: 0
    },
    {
        path: '/economicdata',
        itemName: 'Economic Data',
        icon: ShowChartIcon,
        component: EconomicData,
        exact: false,
        itemType: 0
    },
    // {
    //     path: '/worldeconomic',
    //     itemName: "World Economic",
    //     icon: MapIcon,
    //     component: WorldEconomic,
    //     exact: false,
    //     itemType: 0
    // },
    {
        path: '/taiwan/stock/futuresChip',
        itemName: "Futures Chip",
        icon: AccessibleIcon,
        component: FuturesChip,
        exact: false,
        itemType: 0
    },
    {
        path: '/taiwan/stock/futureChart',
        itemName: "Futures Chart",
        icon: AccessibleIcon,
        component: FuturesChart,
        exact: false,
        itemType: 0
    }
]

export const userItemRoutes = [
    {
        path: '/portfolio',
        itemName: "Portfolio",
        icon: AccountBalanceWalletIcon,
        component: Portfolio,
        exact: false,
        itemType: 0
    }
]

const RouteComponent = () => (
    <div>
        {mainItemRoutes.map((prop, key) => {
            if(prop.itemType === 0){
                return (
                <Route path={prop.path} exact={prop.exact} key={key}><prop.component /></Route>
                );
            }else if (prop.itemType === 1){
                const routeItems = prop.children;
                return (
                <div key={key}>
                    {routeItems.map((itemProp, itemKey)=>
                        <Route path={itemProp.path} 
                        exact={itemProp.exact}
                        key={itemKey}><itemProp.component /></Route>)}
                </div>
                )
            }else{
                return(<div />)
            }
        })}
        {userItemRoutes.map((prop, key) => {
            if(prop.itemType === 0){
                return (
                <Route path={prop.path} exact={prop.exact} key={key}><prop.component /></Route>
                );
            }else if (prop.itemType === 1){
                const routeItems = prop.children;
                return (
                <div key={key}>
                    {routeItems.map((itemProp, itemKey)=>
                        <Route path={itemProp.path} 
                        exact={itemProp.exact}
                        key={itemKey}><itemProp.component /></Route>)}
                </div>
                )
            }else{
                return(<div />)
            }
        })}
        <Route path="/stock/:stockCode" children={<StockChart />} />
        <Route path="/index/:indexCode" children={<StockIndexChart />} />
    </div>
);

export default RouteComponent;
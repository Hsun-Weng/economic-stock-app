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

import FuturesChip from './components/FuturesChip';

import Portfolio from './components/Portfolio';

import SignUp from './components/SignUp';
import OauthRedirect from './components/OauthRedirect';

export const mainItemRoutes = [
    {
        path: '/',
        itemName: '儀表板',
        icon: DashboardIcon,
        component: Dashbaord,
        exact: true,
        itemType: 0
    },
    {
        path: '/economicdata',
        itemName: '經濟數據',
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
        itemName: "期貨籌碼多空比",
        icon: AccessibleIcon,
        component: FuturesChip,
        exact: false,
        itemType: 0
    },
]

export const userItemRoutes = [
    {
        path: '/portfolio',
        itemName: "投資組合",
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
        <Route path="/user/signUp" ><SignUp /></Route>
        <Route path="/oauth/:providerCode" children={<OauthRedirect/>} />
        <Route path="/stock/:stockCode" children={<StockChart />} />
        <Route path="/index/:indexCode" children={<StockIndexChart />} />
    </div>
);

export default RouteComponent;
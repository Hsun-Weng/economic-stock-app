import React from 'react';
import { Route } from 'react-router-dom';

import StockTreeMap from './components/StockTreeMap';
import EconomicData from './components/EconomicData';
import StockChart from './components/StockChart';
import StockIndexChart from './components/StockIndexChart';
import StockCategory from './components/StockCategory';
import StockCategoryTable from './components/StockCategoryTable';
import StockRank from './components/StockRank';
import FuturesChip from './components/FuturesChip';

import Portfolio from './components/Portfolio';

import SignUp from './components/SignUp';
import OauthRedirect from './components/OauthRedirect';

export const mainItemRoutes = [
    {
        path: '/',
        itemName: '儀表板',
        component: StockTreeMap,
        exact: true,
        itemType: 0
    },
    {
        path: '/economicdata',
        itemName: '經濟數據',
        component: EconomicData,
        exact: false,
        itemType: 0
    },
    // {
    //     path: '/worldeconomic',
    //     itemName: "World Economic",
    //     component: WorldEconomic,
    //     exact: false,
    //     itemType: 0
    // },
    {
        path: '/futuresChip',
        itemName: "期貨籌碼多空比",
        component: FuturesChip,
        exact: false,
        itemType: 0
    },
    {
        path: '/stockCategories',
        itemName: "個股類別",
        component: StockCategory,
        exact: false,
        itemType: 0
    },
    {
        path: '/stockRank',
        itemName: "個股成交排行",
        component: StockRank,
        itemType: 0
    }
]

export const userItemRoutes = [
    {
        path: '/portfolio',
        itemName: "投資組合",
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
        <Route path="/stockCategory/:categoryCode" children={<StockCategoryTable />} />
        <Route path="/index/:indexCode" children={<StockIndexChart />} />
    </div>
);

export default RouteComponent;
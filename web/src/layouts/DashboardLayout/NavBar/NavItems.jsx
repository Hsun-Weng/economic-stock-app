import { List } from '@material-ui/core';
import React from 'react';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

const items = [
    {
      href: '/app',
      icon: BarChartIcon,
      title: '儀表板'
    },
    {
      href: '/app/economic',
      icon: UsersIcon,
      title: '經濟數據'
    },
    {
      href: '/app/futures/chip',
      icon: ShoppingBagIcon,
      title: '期貨未平倉'
    },
    {
      href: '/app/stock/category',
      icon: UserIcon,
      title: '個股類別'
    },
    {
      href: '/app/stock/rank',
      icon: SettingsIcon,
      title: '當日個股排行'
    }
];

const NavItems = () => {

  return (
    <List>
      {items.map((item) => (
        <NavItem
          href={item.href}
          key={item.title}
          title={item.title}
          icon={item.icon}
        />
      ))}
    </List>
  );
}

export default NavItems;
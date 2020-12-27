import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon
  } from 'react-feather';
import React from 'react';
import { useSelector } from 'react-redux';
import { List } from '@material-ui/core';
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
    },
    {
      href: '/login',
      icon: LockIcon,
      title: '登入'
    },
    {
      href: '/register',
      icon: UserPlusIcon,
      title: '註冊'
    },
    {
      href: '/404',
      icon: AlertCircleIcon,
      title: 'Error'
    }
];

const userItems = [
  {
    href: '/app/portfolio',
    icon: SettingsIcon,
    title: '投資組合'
  }
];

const NavItems = () => {
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn);

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
      {isLoggedIn&&
        userItems.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))
      }
    </List>
  );
}

export default NavItems;
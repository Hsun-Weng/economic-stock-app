import { List } from '@material-ui/core';
import React from 'react';
import {
  BarChart as BarChartIcon, Globe as GlobeIcon, Grid as GridIcon, Home as HomeIcon, Inbox as InboxIcon
} from 'react-feather';
import NavItem from './NavItem';

const items = [
    {
      href: '/',
      icon: HomeIcon,
      title: '儀表板'
    },
    {
      href: '/economic',
      icon: GlobeIcon,
      title: '經濟數據'
    },
    {
      href: '/futures/chip',
      icon: InboxIcon,
      title: '期貨未平倉'
    },
    {
      href: '/stock/category',
      icon: GridIcon,
      title: '個股類別'
    },
    {
      href: '/stock/rank',
      icon: BarChartIcon,
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
import React, { useMemo } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];

const GlobalMenu: React.FC<{
  top: number;
  left: number;
  width: number;
}> = props => {
  // 如果 top 和 left 都是 0 ，则隐藏菜单
  const showMenu = useMemo(() => {
    return props.top !== 0 && props.left !== 0;
  }, [props.top, props.left]);

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
  };

  return showMenu ? (
    <Menu
      className="fixed z-10 border rounded-sm"
      style={{ top: props.top, left: props.left, width: props.width }}
      onClick={onClick}
      defaultSelectedKeys={['13']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  ) : null;
};

export default GlobalMenu;

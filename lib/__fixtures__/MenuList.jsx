import React from 'react';
import { MenuList } from '../components/MenuList';

export const Menu = [
  { text: 'Option', iconName: 'Gear' },
  { text: 'Option', iconName: 'Gear' },
  { text: 'Option', iconName: 'Gear' },
  { text: 'Option' },
  { text: 'Option', disable: true },
];

const ContainerTabs = {
  default: (
    <div>
      <MenuList data={Menu} onSelect={() => {}} />
    </div>
  ),
};

export default ContainerTabs;

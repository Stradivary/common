import React from 'react';
import { Checkbox } from '../components';

const option = [
  {
    id: '1',
    value: 'red',
  },
  {
    id: '2',
    value: 'green',
  },
  {
    id: '3',
    value: 'blue',
  },
  {
    id: '4',
    value: 'alpha',
  },
];
const nestedOption = [
  {
    id: '1',
    value: 'red',
  },
  {
    id: '2',
    value: 'green',
  },
  {
    id: '3',
    value: 'blue',
  },
  {
    id: '4',
    value: 'alpha',
    children: [
      {
        id: '41',
        value: 'alpha-1',
      },
      {
        id: '42',
        value: 'alpha-2',
      },
      {
        id: '43',
        value: 'alpha-3',
      },
    ],
  },
];

export default {
  default: <Checkbox option={option} />,
  grid: <Checkbox type="grid" gridCol={2} option={option} />,
  'nest checkboxes': <Checkbox option={nestedOption} />,
  disabled: <Checkbox option={option} disabled />,
};

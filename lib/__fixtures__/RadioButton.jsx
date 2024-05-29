import React from 'react';
import { RadioButton } from '../components';

const option = [
  {
    value: 'red',
    id: '1',
  },
  {
    value: 'green',
    id: '2',
  },
  {
    value: 'blue',
    id: '3',
  },
  {
    value: 'alpha',
    id: '4',
  },
];

const data = {
  id: '1',
  value: 'opptyId',
};

export default {
  default: <RadioButton option={option} />,
  disabled: <RadioButton option={option} disabled />,
  grid: <RadioButton option={option} grid gridCol={2} />,
  card: <RadioButton option={option} variant="card" />,
  standalone: <RadioButton data={data} variant="standalone" />,
};

import React from 'react';
import { NumberFormatter } from '../components';

const amount = '1200000';

export default {
  default: <NumberFormatter language="en" value={amount} abbreviate />,
};

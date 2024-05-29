import React from 'react';
import { Divider } from '../components';

const margin = '0.5rem auto';

export default {
  fullWidth: <Divider margin={margin} />,
  inset: <Divider variant="inset" margin={margin} />,
  middleInset: <Divider variant="middle-inset" margin={margin} />,
};

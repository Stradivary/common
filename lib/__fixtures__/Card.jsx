/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Card } from '../components/Card';

const divStyle = {
  width: '100vw',
  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const productProps = {
  isDisable: true,
  buttonVariant: 'outlined',
};

const kanbanProps = {
  isWarning: true,
  lastUpdate: '2023-12-12',
  amount: 3000000,
};

export default {
  Kanban: (
    <div style={divStyle}>
      <Card variant="kanban" width="20rem" height="20rem" {...kanbanProps} />
    </div>
  ),
  large: (
    <div style={divStyle}>
      <Card variant="large" width="35%" height="20rem" />
    </div>
  ),
  medium: (
    <div style={divStyle}>
      <Card variant="medium" width="15rem" height="15rem" />
    </div>
  ),
  product: (
    <div style={divStyle}>
      <Card
        variant="product"
        width="fit-content"
        height="20rem"
        {...productProps}
      />
    </div>
  ),
  list: (
    <div style={divStyle}>
      <Card variant="list" />
    </div>
  ),
};

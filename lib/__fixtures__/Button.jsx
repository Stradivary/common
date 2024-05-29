import React from 'react';
import { Button, Typography, Icon } from '../components';
import { hexToRGBA } from '../utils';
import { theme } from '../styles/theme';

export default {
  contained: (
    <Button variant="contained" size="large" color="neutral5">
      <Typography>Contained button</Typography>
    </Button>
  ),
  'contained medium': (
    <Button variant="contained" size="medium" color="neutral5">
      <Typography>Contained button</Typography>
    </Button>
  ),
  'contained small': (
    <Button variant="contained" size="small" color="neutral5">
      <Typography>Contained button</Typography>
    </Button>
  ),
  'contained disabled': (
    <Button variant="contained" size="large" disabled color="neutral5">
      <Typography>disabled button</Typography>
    </Button>
  ),
  outlined: (
    <Button variant="outlined" size="large" color="primary">
      outlined button
    </Button>
  ),
  'outlined medium': (
    <Button variant="outlined" size="medium" color="primary">
      outlined button
    </Button>
  ),
  'outlined small': (
    <Button variant="outlined" size="small" color="primary">
      outlined button
    </Button>
  ),
  'outlined disabled': (
    <Button variant="outlined" size="large" disabled>
      disabled button
    </Button>
  ),
  link: (
    <Button variant="link" size="large" color="neutral90">
      Link / ghost button
    </Button>
  ),
  'link disabled': (
    <Button variant="link" size="large" disabled>
      Link / ghost button
    </Button>
  ),
  'with icon': (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Button startIcon="Checkmark">
        <Typography>Submit</Typography>
      </Button>
      <Button endIcon="Checkmark">
        <Typography>Submit</Typography>
      </Button>
      <Button startIcon="Checkmark" endIcon="Checkmark">
        <Typography>Submit</Typography>
      </Button>
    </div>
  ),
  'floating Button Only': (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Button
        variant="floating"
        size="medium"
        height="fit-content"
        bgColor="neutral5"
        color="blue80"
      >
        <Typography lineHeight="27px" weight={500} size="18px">
          Button
        </Typography>
      </Button>
    </div>
  ),
  'floating icon only': (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Button
        variant="floating"
        borderRadius="100%"
        height="4rem"
        width="4rem"
        boxShadow={`0 6px 6px ${hexToRGBA(theme.colors.neutral80, 0.1)}`}
      >
        <Icon iconName="Checkmark" color="neutral5" />
      </Button>
    </div>
  ),
  'floating icon and button': (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Button
        variant="floating"
        size="medium"
        height="fit-content"
        color="neutral5"
        startIcon="Checkmark"
        gap="0.5rem"
        boxShadow={`0 6px 6px ${hexToRGBA(theme.colors.neutral80, 0.1)}`}
      >
        <Typography lineHeight="27px" weight={500} size="18px">
          Button
        </Typography>
      </Button>
    </div>
  ),
};

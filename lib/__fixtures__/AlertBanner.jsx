/* eslint-disable no-alert */
import React, { useState } from 'react';
import { AlertBanner, Button, Typography } from '../components';

const AlertBannerDemo = () => {
  const [isShowSnackbar, setShowSnackbar] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="neutral5"
        onClick={() => setShowSnackbar(true)}
      >
        <Typography>Test Alert Banner</Typography>
      </Button>
      <AlertBanner
        isOpen={isShowSnackbar}
        type="info"
        title="Title"
        message="This is Alert Banner Type Info"
        buttonName="Click Me"
        onClickButton={() => alert('You Clicked me!')}
        onClose={() => setShowSnackbar(false)}
        timeout={999999}
      />
    </>
  );
};

export default {
  demo: AlertBannerDemo,
  info: (
    <AlertBanner
      isOpen
      type="info"
      title="Info Alert Banner"
      message="This is Alert Banner Type Info"
    />
  ),
  success: (
    <AlertBanner
      isOpen
      type="success"
      title="Success Alert Banner"
      message="This is Alert Banner Type Success"
    />
  ),
  warning: (
    <AlertBanner
      isOpen
      type="warning"
      title="Warning Alert Banner"
      message="This is Alert Banner Type Warning"
    />
  ),
  danger: (
    <AlertBanner
      isOpen
      type="danger"
      title="Danger Alert Banner"
      message="This is Alert Banner Type Danger"
    />
  ),
};

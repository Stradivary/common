import React from 'react';
import { Snackbar } from '../components';

const text = 'The quick brown fox jumps over the lazy dog ';

export default {
  props: <Snackbar timeout={5000} />,
  default: <Snackbar type="default" text={text} />,
  info: <Snackbar type="info" text={text} />,
  warning: <Snackbar type="warning" text={text} />,
  danger: <Snackbar type="danger" text={text} />,
  success: <Snackbar type="success" text={text} />,
};

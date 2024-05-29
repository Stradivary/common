import React from 'react';
import { TextField, Typography, Icon } from '../components';

// this error structur is example error return when using react-hook-form, see component form example
const error = {
  leadName: {
    message: 'field required',
  },
};
export default {
  default: <TextField />,
  disabled: (
    <TextField disabled endAdornment={<Icon iconName="ChevronDown" />} />
  ),
  'with label': <TextField label="Name" />,
  error: <TextField name="leadName" label="Lead Name" errors={error} />,
  'with startAdornment or endAdorment': (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 200 }}
    >
      <TextField
        label="Phone Number"
        type="number"
        startAdornment={
          <Typography size="1.4rem" color="neutral50">
            +62
          </Typography>
        }
      />

      <TextField
        label="Phone Number"
        type="number"
        endAdornment={
          <Typography size="1.4rem" color="neutral50">
            +62
          </Typography>
        }
      />
    </div>
  ),
};

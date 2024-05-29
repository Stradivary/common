import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { theme } from '../../styles/theme';
import { CircularBar, GreyCircle, WhiteCircle } from './styled';

export const RadialBar = ({ percentage, status }) => {
  const Label = percentage === 0 ? status : `${percentage}%`;

  if (percentage === 0) {
    return (
      <CircularBar fillPercentage={percentage} status={status}>
        <GreyCircle>
          <Typography
            variant="label"
            size="1.2rem"
            lineHeight="160%"
            fontStyle="bold"
            weight="700"
            color={theme.colors.neutral80}
          >
            {Label}
          </Typography>
        </GreyCircle>
      </CircularBar>
    );
  }

  if (percentage === 100) {
    return (
      <CircularBar fillPercentage={percentage} status={status}>
        <WhiteCircle>
          <Typography
            variant="label"
            size="1.2rem"
            lineHeight="160%"
            fontStyle="bold"
            weight="700"
            color={theme.colors.neutral80}
          >
            {status}
          </Typography>
        </WhiteCircle>
      </CircularBar>
    );
  }

  return (
    <CircularBar fillPercentage={percentage} status={status}>
      <WhiteCircle>
        <Typography
          variant="label"
          size="1.2rem"
          lineHeight="160%"
          fontStyle="bold"
          weight="700"
          color={theme.colors.neutral80}
        >
          {Label}
        </Typography>
      </WhiteCircle>
    </CircularBar>
  );
};

RadialBar.propTypes = {
  percentage: PropTypes.number,
  status: PropTypes.string,
};

RadialBar.defaultProps = {
  percentage: 0,
  status: 'InProgress',
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import {
  Container,
  ProgressBarContainer,
  ProgressBarInner,
  Icons,
  CloseIcon,
  Header,
  ProgressContainer,
} from './styled';

export const ProgressBar = ({
  percentage,
  label,
  labelColor,
  description,
  filename,
  withIcon,
  withOption,
  withCloseIcon,
  withLabel,
  size,
  width,
  withoutMargin,
}) => {
  const [type, setType] = useState('Progress');

  const handleCancelClick = () => {
    // TODO Logic
    setType('Canceled');
  };

  return (
    <ProgressBarContainer className="progressbar" width={width}>
      <Header>
        {withLabel && label && (
          <Typography
            color={labelColor || 'dark'}
            variant="label"
            size="1.2rem"
            lineHeight="150%"
            weight={700}
            margin="0 0 0 0.5rem"
          >
            {label}
          </Typography>
        )}
        {description && (
          <Typography
            color="grayStell"
            size="1.2rem"
            lineHeight="1.8rem"
            weight={500}
          >
            {description}
          </Typography>
        )}
      </Header>
      <Container>
        <ProgressContainer withoutMargin={withoutMargin} size={size}>
          <ProgressBarInner percentage={percentage} />
        </ProgressContainer>
        {withIcon && (
          <>
            <Icons>
              <Icon iconName="Cloud" size="16px" />
            </Icons>
            <Typography
              variant="label"
              size="1rem"
              lineHeight="150%"
              weight="400"
              margin="0 0 0 1rem"
            >
              {type}
            </Typography>
          </>
        )}
        {withCloseIcon && (
          <CloseIcon onClick={handleCancelClick}>
            <Icon iconName="FilledBadgeError" size="12px" />
          </CloseIcon>
        )}{' '}
      </Container>
      {withOption && filename && (
        <Typography
          variant="label"
          size="1.2rem"
          lineHeight="150%"
          fontStyle="normal"
          weight="400"
          margin="0 0 0 0.5rem"
        >
          {filename}
        </Typography>
      )}
    </ProgressBarContainer>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  description: PropTypes.string,
  filename: PropTypes.string,
  withIcon: PropTypes.bool,
  withOption: PropTypes.bool,
  withCloseIcon: PropTypes.bool,
  withLabel: PropTypes.bool,
  size: PropTypes.string,
  width: PropTypes.string,
  withoutMargin: PropTypes.bool,
};

ProgressBar.defaultProps = {
  label: 'Label',
  labelColor: '',
  description: '',
  filename: 'Optional helper text',
  percentage: 25,
  withIcon: false,
  withOption: false,
  withCloseIcon: false,
  withLabel: false,
  size: 'big',
  width: '',
  withoutMargin: false,
};

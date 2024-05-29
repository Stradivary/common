import React from 'react';
import PropTypes from 'prop-types';
import { BadgeContainer } from './styled';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { theme } from '../../styles/theme';

const iconsMapping = {
  away: {
    name: 'FilledBadgeAway',
    backgroundColor: `${theme.colors.orange}`,
  },
  'do-not-disturb': {
    name: 'FilledBadgeDoNotDisturb',
    backgroundColor: `${theme.colors.secondary}`,
  },
  error: {
    name: 'FilledBadgeError',
    backgroundColor: `${theme.colors.secondary}`,
  },
  available: {
    name: 'FilledBadgeAvailable',
    backgroundColor: `${theme.colors.green}`,
  },
};

export const Badge = (props) => {
  const {
    backgroundColor,
    iconStatus,
    label,
    outlineColor,
    variant,
    style,
    fontSize,
    fontWeight,
    labelStyle,
  } = props;

  const formatLabel = (currentLabel) => {
    if (variant === 'notification' && currentLabel && currentLabel > 99) {
      return '99+';
    }
    return currentLabel;
  };

  const getIconName = (status) =>
    iconsMapping[status].name || iconsMapping.available.name;

  const getIconColor = (status) =>
    iconsMapping[status].backgroundColor ||
    iconsMapping.available.backgroundColor;

  return (
    <BadgeContainer
      variant={variant}
      backgroundColor={backgroundColor}
      outlineColor={outlineColor}
      style={style}
    >
      {label && (
        <Typography
          size={fontSize}
          weight={fontWeight}
          lineHeight="150%"
          letterSpacing="2%"
          style={labelStyle}
        >
          {formatLabel(label)}
        </Typography>
      )}
      {variant === 'icon' && (
        <Icon
          iconName={getIconName(iconStatus)}
          size="13px"
          color={getIconColor(iconStatus)}
        />
      )}
    </BadgeContainer>
  );
};

Badge.defaultProps = {
  backgroundColor: '',
  label: '',
  iconStatus: 'available',
  outlineColor: false,
  variant: 'default',
  style: {},
  labelStyle: {},
  fontSize: '1.2rem',
  fontWeight: '400',
};

Badge.propTypes = {
  backgroundColor: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconStatus: PropTypes.oneOf(['available', 'away', 'do-not-disturb', 'error']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  outlineColor: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'notification', 'icon', 'dot']),
  style: PropTypes.shape({}), // Used for custom styling
  labelStyle: PropTypes.shape({}),
};

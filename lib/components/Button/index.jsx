/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { Contained, Outlined, Link, Floating, ChildrenWrapper } from './style';
import { Icon } from '../Icon';
import { Badge } from '../Badge';
import { browserHistory } from '../../utils';

export const Button = (props) => {
  const {
    variant,
    to,
    onClick,
    children,
    fullWidth,
    bgColor,
    startIcon,
    endIcon,
    color,
    hideChildrenWhenMobile,
    paddingSize,
    padding,
    iconSize,
    badge,
    id,
    justifyContent,
    ...rest
  } = props;

  const renderButton = () => {
    let Component = null;
    switch (variant) {
      case 'contained':
        Component = Contained;
        break;
      case 'outlined':
        Component = Outlined;
        break;
      case 'floating':
        Component = Floating;
        break;
      case 'link':
        return (
          <Router history={browserHistory}>
            <Link
              to={to || '#'}
              $startIcon={!!startIcon}
              $endIcon={!!endIcon}
              onClick={onClick}
              color={color}
              id={id}
              padding={padding}
              {...rest}
            >
              {startIcon && (
                <Icon
                  iconName={startIcon}
                  size={iconSize || '1.6rem'}
                  color={color}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              )}
              {children}
              {endIcon && (
                <Icon
                  iconName={endIcon}
                  size={iconSize || '1.6rem'}
                  color={color}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              )}
            </Link>
          </Router>
        );
      default:
        Component = Contained;
    }
    return (
      <Component
        id={id}
        onClick={onClick}
        fullWidth={fullWidth}
        bgColor={bgColor}
        startIcon={!!startIcon}
        endIcon={!!endIcon}
        color={color}
        hideChildrenWhenMobile={hideChildrenWhenMobile}
        paddingSize={paddingSize}
        padding={padding}
        justifyContent={justifyContent}
        {...rest}
      >
        {startIcon && (
          <Icon
            iconName={startIcon}
            size={iconSize || '1.6rem'}
            color={color}
          />
        )}
        <ChildrenWrapper hideChildrenWhenMobile={hideChildrenWhenMobile}>
          {children}
        </ChildrenWrapper>
        {endIcon && (
          <Icon iconName={endIcon} size={iconSize || '1.6rem'} color={color} />
        )}
        {badge && (
          <Badge
            id={id}
            label={badge.label}
            variant={badge.variant}
            backgroundColor={badge.backgroundColor}
            outlineColor={badge.outlineColor}
            iconStatus={badge.iconStatus}
            fontSize={badge.fontSize}
            fontWeight={badge.fontWeight}
            labelStyle={badge.labelStyle}
            style={{
              marginLeft: '8px',
              ...badge.style,
            }}
          />
        )}
      </Component>
    );
  };
  return renderButton();
};

Button.defaultProps = {
  variant: 'contained',
  disabled: false,
  id: '',
  name: '',
  type: 'button',
  fullWidth: false,
  width: 'fit-content',
  height: 'fit-content',
  size: 'large',
  to: null,
  onClick: () => {},
  bgColor: 'primary',
  color: 'neutral5',
  startIcon: null,
  endIcon: null,
  iconSize: null,
  hideChildrenWhenMobile: false,
  paddingSize: {},
  justifyContent: 'center',
  badge: null,
  textDecoration: '',
  padding: null,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['link', 'contained', 'outlined', 'floating']),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  fullWidth: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  to: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  startIcon: PropTypes.string,
  endIcon: PropTypes.string,
  iconSize: PropTypes.string,
  hideChildrenWhenMobile: PropTypes.bool,
  paddingSize: PropTypes.shape({
    mb: PropTypes.string,
    tp: PropTypes.string,
    tl: PropTypes.string,
  }),
  justifyContent: PropTypes.string,
  badge: PropTypes.shape({}),
  textDecoration: PropTypes.string,
  padding: PropTypes.string,
};

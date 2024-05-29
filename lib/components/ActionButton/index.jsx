/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import {
  Button,
  DropdownContainer,
  DropdownItem,
  RelativeWrapper,
} from './styled';

/*
 * Component Overview:
 * The ActionButton component is a component designed to provide a button that can be utilized for specific actions related to tables.
 * This component extends from the general Button component but incorporates specific variations to address the needs of actions such as buttons for filtering, sorting, download, and other relevant actions.
 */

export const ActionButton = (props) => {
  const {
    id,
    onClick,
    variant,
    countFilters,
    options,
    text,
    top,
    startIcon,
    endIcon,
    showIconOnlyOnMobileScreen,
    showIconOnly,
    sizeButton,
    hideChildrenWhenMobile,
    position,
    color,
    borderRadius,
    padding,
    buttonVariant,
    border,
    disabled,
  } = props;

  const [isOpenSelectDropdown, setIsOpenSelectDropdown] = useState(false);
  const [isOpenSortDropdown, setIsOpenSortDropdown] = useState(false);
  const selectRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (selectRef.current && !selectRef.current.contains(event.target)) ||
        (sortRef.current && !sortRef.current.contains(event.target))
      ) {
        if (selectRef.current) setIsOpenSelectDropdown(false);
        if (sortRef.current) setIsOpenSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleShowDropdown = () => {
    if (variant === 'dropdown') setIsOpenSelectDropdown(!isOpenSelectDropdown);
    if (variant === 'sort') setIsOpenSortDropdown(!isOpenSortDropdown);
  };

  const handleSelectDropdown = (item) => () => {
    if (item.onClick) item.onClick(item);

    if (variant === 'dropdown') {
      setIsOpenSelectDropdown(!isOpenSelectDropdown);
      return;
    }
    if (variant === 'sort') {
      setIsOpenSortDropdown(!isOpenSortDropdown);
    }
  };

  const renderDropdownContainer = (isOpen, ref) =>
    isOpen && (
      <DropdownContainer
        ref={ref}
        top={top}
        position={position}
        minWidth={variant === 'dropdown' ? 'max-content' : ''}
        className="dropdown-container"
      >
        {options.map((item, index) => {
          const itemId = `option-${variant}-${index + 1}`;
          return (
            <DropdownItem
              key={itemId}
              id={itemId.toLowerCase()}
              onClick={!item.disabled ? handleSelectDropdown(item) : undefined}
              minWidth={variant === 'dropdown' ? 'max-content' : ''}
              disabled={item.disabled}
            >
              {item.iconName && (
                <Icon
                  iconName={item.iconName}
                  size={item.iconSize}
                  color={item.iconColor}
                  disabled={item.disabled}
                />
              )}
              <Typography
                size="1.2rem"
                color={item.disabled ? 'neutral50' : 'neutral80'}
                weight={400}
                lineHeight="150%"
              >
                {item.label}
              </Typography>
            </DropdownItem>
          );
        })}
      </DropdownContainer>
    );

  const Filter = (
    <Button
      id="btn-toggle-advance-search"
      variant="outlined"
      startIcon="OutlinedFilter"
      weight={400}
      color="blue80"
      bgColor="blue80"
      size={sizeButton}
      iconSize="20px"
      onClick={onClick}
      badge={
        countFilters > 0
          ? {
              label: countFilters,
              backgroundColor: 'darkRed50',
              fontSize: '0.8rem',
              fontWeight: 600,
              style: {
                padding: '0',
                borderRadius: '100%',
                height: '22px',
                width: '22px',
              },
              labelStyle: {
                height: '11px',
              },
            }
          : undefined
      }
      showIconOnlyOnMobileScreen={showIconOnlyOnMobileScreen}
      fullWidth={!showIconOnlyOnMobileScreen}
      hideChildrenWhenMobile={hideChildrenWhenMobile}
    >
      <Typography color="blue80" lineHeight="150%" size="1.4rem">
        Filter
      </Typography>
    </Button>
  );

  const Download = (
    <Button
      id={`btn-download-${id}`}
      variant="outlined"
      size={sizeButton}
      onClick={onClick}
      color="primary"
      showIconOnlyOnMobileScreen={showIconOnlyOnMobileScreen}
      fullWidth={!showIconOnlyOnMobileScreen}
      disabled={disabled}
    >
      <Icon
        stroke={disabled ? 'neutral60' : 'primary'}
        size="20px"
        iconName="Download"
        disabled={disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </Button>
  );

  const Dropdown = (
    <RelativeWrapper className="relative-wrapper">
      <Button
        id={`btn-dropdown-${id}`}
        variant={buttonVariant || 'outlined'}
        startIcon={startIcon}
        endIcon={endIcon}
        iconSize="20px"
        color={color}
        bgColor={color}
        size={sizeButton}
        onClick={handleShowDropdown}
        showIconOnly={showIconOnly}
        showIconOnlyOnMobileScreen={showIconOnlyOnMobileScreen}
        fullWidth={!showIconOnlyOnMobileScreen}
        borderRadius={borderRadius}
        padding={padding}
        border={border}
      >
        <Typography color={color} lineHeight="150%" size="1.4rem">
          {text}
        </Typography>
      </Button>
      {renderDropdownContainer(isOpenSelectDropdown, selectRef)}
    </RelativeWrapper>
  );

  const Sort = (
    <RelativeWrapper>
      <Button
        id={`btn-sort-${id}`}
        startIcon="OutlinedSort"
        iconSize="16px"
        color="blue80"
        bgColor="blue80"
        variant="outlined"
        size={sizeButton}
        height="40px"
        onClick={handleShowDropdown}
        showIconOnlyOnMobileScreen={showIconOnlyOnMobileScreen}
        fullWidth={!showIconOnlyOnMobileScreen}
        hideChildrenWhenMobile={hideChildrenWhenMobile}
      >
        <Typography color="blue80" lineHeight="150%" size="1.4rem">
          Urutkan
        </Typography>
      </Button>
      {renderDropdownContainer(isOpenSortDropdown, sortRef)}
    </RelativeWrapper>
  );

  const renderActionButton = () => {
    let component = null;

    switch (variant) {
      case 'filter':
        component = Filter;
        break;
      case 'download':
        component = Download;
        break;
      case 'dropdown':
        component = Dropdown;
        break;
      case 'sort':
        component = Sort;
        break;
      default:
        component = <Typography>Action Not Found</Typography>;
    }

    return component;
  };

  return renderActionButton();
};

ActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['filter', 'dropdown', 'download', 'sort'])
    .isRequired,
  text: PropTypes.string,
  top: PropTypes.string,
  position: PropTypes.string,
  startIcon: PropTypes.string,
  endIcon: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      iconName: PropTypes.string,
      iconSize: PropTypes.string,
      iconColor: PropTypes.string,
    })
  ),
  countFilters: PropTypes.number,
  showIconOnlyOnMobileScreen: PropTypes.bool,
  showIconOnly: PropTypes.bool,
  sizeButton: PropTypes.string,
  hideChildrenWhenMobile: PropTypes.bool,
  disabled: PropTypes.bool,
  buttonVariant: PropTypes.string,
};
ActionButton.defaultProps = {
  onClick: null,
  options: [],
  countFilters: 0,
  text: 'Urutkan',
  top: '',
  startIcon: null,
  endIcon: null,
  color: 'blue80',
  showIconOnlyOnMobileScreen: true,
  showIconOnly: false,
  sizeButton: 'medium',
  hideChildrenWhenMobile: false,
  position: 'right',
  disabled: false,
};

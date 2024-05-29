/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { theme } from '../../styles/theme';
import { browserHistory as history } from '../../utils';
import {
  BreadcrumbsContainer,
  BreadcrumbsWrapper,
  BreadcrumbsItem,
  ItemWrapper,
  DropdownWrapper,
} from './styled';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { Dropdown } from '../Dropdown';

export const Breadcrumbs = ({ data, maxVisibleItems }) => {
  const { pathname: currentPath, search: queryPath } = history.location;
  const [containerWidth, setContainerWidth] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [breadcrumbsData, setBreadcrumbsData] = useState([]);
  const [truncatedDataSubsets, setTruncatedDataSubsets] = useState([]);

  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const getTruncatedData = (initialData) => {
    const ellipsisItem = { id: 'ellipsis', label: '...', path: '#' };
    return [initialData[0], ellipsisItem, initialData[initialData.length - 1]];
  };

  useEffect(() => {
    if (data) {
      setBreadcrumbsData(data);
    }
  }, [data]);

  useEffect(() => {
    setWrapperWidth(wrapperRef.current?.clientWidth);
    setContainerWidth(containerRef.current?.clientWidth);
  }, [breadcrumbsData]);

  useEffect(() => {
    const handleResize = () => {
      setWrapperWidth(wrapperRef.current?.clientWidth);
      setContainerWidth(containerRef.current?.clientWidth);

      const isMobile = window.innerWidth < theme.screenSizes.tp[1];
      const shouldTruncate =
        breadcrumbsData.length > maxVisibleItems || isMobile;

      if (shouldTruncate) {
        setBreadcrumbsData(getTruncatedData(data));
        setTruncatedDataSubsets(data.slice(1, -1));
      } else {
        setBreadcrumbsData(data);
        setTruncatedDataSubsets([]);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerWidth, wrapperWidth]);

  return (
    <BreadcrumbsContainer ref={containerRef}>
      <BreadcrumbsWrapper ref={wrapperRef}>
        {breadcrumbsData.length > 0 &&
          breadcrumbsData.map((item, index) => {
            const isLastIndex = index === breadcrumbsData.length - 1;
            return (
              <BreadcrumbItem
                key={item.id}
                data={item}
                isActive={item.path === currentPath + queryPath || isLastIndex}
                isDisabled={item.isDisabled || isLastIndex}
                truncatedDataSubsets={truncatedDataSubsets}
                showIconSeparator={index !== breadcrumbsData.length - 1}
                isLastIndex={isLastIndex}
              />
            );
          })}
      </BreadcrumbsWrapper>
    </BreadcrumbsContainer>
  );
};

const BreadcrumbItem = (props) => {
  const {
    data,
    showIconSeparator,
    isActive,
    truncatedDataSubsets,
    isDisabled,
    isLastIndex,
  } = props;

  const [options, setOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const dropdownRef = useRef(null);
  const isMobile = window.innerWidth < theme.screenSizes.tp[1];

  useEffect(() => {
    const setDropdownOptions = truncatedDataSubsets.map((subset) => ({
      ...subset,
      value: subset.label,
    }));
    setOptions(setDropdownOptions);
  }, [truncatedDataSubsets]);

  const toggleMenuIsOpen = () => {
    setMenuIsOpen((value) => !value);
  };

  const handleClickItem = (path) => () => {
    if (path && path !== '#') {
      history.push(path);
    } else {
      toggleMenuIsOpen();
    }
  };

  const getBreadcrumbItemColor = (activeColor, disabledColor) => {
    let color = 'neutral70';

    if (disabledColor) color = 'neutral40';
    if (activeColor) color = 'blue80';

    return color;
  };

  const handleChange = (val) => {
    setSelectValue(val);
    history.push(val.path);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <BreadcrumbsItem
      isEllipsis={data.id === 'ellipsis'}
      isDisabled={data.isDisabled}
      isActive={isActive}
    >
      <ItemWrapper
        id={`crumb-${data.id}`}
        isDisabled={isDisabled}
        onClick={!isDisabled ? handleClickItem(data.path) : undefined}
      >
        {data.iconName && <Icon iconName={data.iconName} size="24px" />}
        <Typography
          size="1.4rem"
          className="breadcrumbItemLabel"
          color={getBreadcrumbItemColor(isActive, data.isDisabled)}
          weight={isActive ? 600 : 400}
          lineHeight="150%"
          style={
            isLastIndex
              ? {
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 1,
                  width: data.label.length > 30 && isMobile ? '60%' : '100%',
                }
              : null
          }
        >
          {data.label}
        </Typography>
        {truncatedDataSubsets.length > 0 &&
          menuIsOpen &&
          data.id === 'ellipsis' && (
            <DropdownWrapper ref={dropdownRef}>
              <Dropdown
                id="breadcrumbs-dropdown"
                name={`breadcrumbsDropdown${data.id}`}
                variant="basic"
                options={options}
                menuIsOpen={menuIsOpen}
                onChange={handleChange}
                defaultValue={selectValue}
              />
            </DropdownWrapper>
          )}
      </ItemWrapper>
      {showIconSeparator && (
        <Icon
          iconName="ChevronRight"
          size="16px"
          color="blue80"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
    </BreadcrumbsItem>
  );
};

Breadcrumbs.defaultProps = {
  maxVisibleItems: 6, // Maximum Visible Breadcrumbs Item from Guideline is 6-7 items
};

Breadcrumbs.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      isDisabled: PropTypes.bool,
      iconName: PropTypes.string,
    })
  ).isRequired,
  maxVisibleItems: PropTypes.number,
};

BreadcrumbItem.defaultProps = {
  data: {
    id: '',
    label: '',
    path: '',
    iconName: '',
    isDisabled: false,
  },
  isActive: false,
  isDisabled: false,
  isLastIndex: false,
  showIconSeparator: false,
  truncatedDataSubsets: [],
};

BreadcrumbItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    iconName: PropTypes.string,
    isDisabled: PropTypes.bool,
  }),
  isDisabled: PropTypes.bool,
  isLastIndex: PropTypes.bool,
  isActive: PropTypes.bool,
  showIconSeparator: PropTypes.bool,

  truncatedDataSubsets: PropTypes.arrayOf(PropTypes.shape({})),
};

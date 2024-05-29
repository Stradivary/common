/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../Icon';
import { TextField } from '../Textfield';

export const SearchInput = ({
  id,
  placeholder,
  value,
  width,
  handleSearch,
  onChange,
  filled,
  showIcon,
  disabled,
}) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleChange = (currentValue) => {
    if (onChange) {
      onChange(currentValue);
    }
    setSearchValue(currentValue);
  };

  const handleClickSearch = () => {
    handleSearch && handleSearch(searchValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch && handleSearch(searchValue);
    }
  };

  return (
    <TextField
      id={`input-search-${id}`}
      name={`input-search-${id}`}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      value={searchValue}
      borderRadius="4px"
      padding="12px 0 12px 12px"
      width={width}
      filled={filled}
      disabled={disabled}
      endAdornment={
        showIcon ? (
          <Icon
            id={`btn-search-${id}`}
            iconName="Magnifying"
            size="14px"
            color="neutral60"
            onClick={handleClickSearch}
          />
        ) : null
      }
    />
  );
};

SearchInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.string,
  filled: PropTypes.bool,
  showIcon: PropTypes.bool,
  disabled: PropTypes.bool,

  onChange: PropTypes.func,
  handleSearch: PropTypes.func,
};

SearchInput.defaultProps = {
  placeholder: 'Search',
  value: '',
  width: '261px',
  filled: false,
  showIcon: true,
  disabled: false,

  onChange: () => {},
  handleSearch: () => {},
};

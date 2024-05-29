/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../Textfield';
import { Icon } from '../Icon';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { ContainerDropdown, DropdownItem, ContainerItems } from './style';

export const DropdownGrup = (props) => {
  const {
    option,
    onSelect,
    id,
    type,
    count,
    isRight,
    name,
    placeholder,
    disabled,
    register,
    validation,
  } = props;

  const ref = useRef();

  const [textEndAdornment, setTextEndAdornment] = useState(option[0]);
  const [number, setNumber] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const hookForm = register?.(name, validation);

  const handleChange = () => {
    const targetValue = {
      target: {
        name,
        value: number
          ? { number: number || 0, tag: textEndAdornment.value }
          : '',
      },
    };
    if (register) {
      hookForm.onChange(targetValue);
    }
  };

  const handleChangeEndAdornment = (item) => {
    setTextEndAdornment(item);
    onSelect(item);
    setIsShow(false);
  };

  useEffect(() => {
    if (ref) {
      const handleClickOutside = (event) => {
        if (!event?.target?.classList.contains('optionDropdown')) {
          setIsShow(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
    }
  }, [ref]);

  useEffect(() => {
    handleChange();
  }, [number, textEndAdornment]);
  return (
    <Flex direction="row" alignItems="center" wrap="nowrap" position="relative">
      <TextField
        id={`DropdownGrup-${id}`}
        key={name}
        width="100%"
        onChange={(e) => setNumber(e)}
        placeholder={placeholder}
        type={type}
        endAdornment={
          <Flex
            ref={ref}
            direction="row"
            gap="spacing02"
            alignItems="center"
            wrap="nowrap"
            onClick={() => setIsShow(!isShow)}
          >
            <Typography weight={500} size="1.2rem" color="neutral60">
              {textEndAdornment.label}
            </Typography>
            <Icon iconName="ChevronDown" size="28px" />
          </Flex>
        }
        disabled={disabled}
      />
      {isShow && option.length > 0 && (
        <ContainerDropdown
          id={`container-dropdown-${id}`}
          count={count}
          className="optionDropdown"
          isRight={isRight}
        >
          <ContainerItems>
            {option.map((item, index) => (
              <DropdownItem
                id={`option-${index}-${id}`}
                key={`option-${item?.value}`}
                name="dropdown-page"
                className="optionDropdown"
                onClick={() => handleChangeEndAdornment(item)}
              >
                <Typography
                  className="optionDropdown"
                  id={`text-${
                    /* label could be component */
                    typeof item?.label === 'object'
                      ? index
                      : item?.label.toString()
                  }`}
                  size="1.4rem"
                  color="blue80"
                  lineHeight="21px"
                >
                  {/* label could be component */}
                  {typeof item?.label === 'object'
                    ? item?.label
                    : item?.label.toString()}
                </Typography>
              </DropdownItem>
            ))}
          </ContainerItems>
        </ContainerDropdown>
      )}
    </Flex>
  );
};

DropdownGrup.defaultProps = {
  id: 'idDropdownGrup',
  option: [
    { label: 'Hours', value: 'hours' },
    { label: 'Days', value: 'days' },
    { label: 'Weeks', value: 'weeks' },
    { label: 'Month', value: 'months' },
    { label: 'Years', value: 'years' },
  ],
  placeholder: 'Input ...',
  onSelect: () => {},
  count: 5,
  type: 'text',
  isRight: true,
  register: null,
  name: '',
  disabled: false,
  validation: {},
};

DropdownGrup.propTypes = {
  id: PropTypes.string,
  register: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  validation: PropTypes.shape({}),
  name: PropTypes.string,
  onSelect: PropTypes.func,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  count: PropTypes.number,
  isRight: PropTypes.bool,
  option: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

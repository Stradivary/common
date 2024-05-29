/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import {
  BaseStyles,
  ControlWrapper,
  Mark,
  CheckboxLabel,
  Checkbox,
  DropdownWrapper,
  ErrorWrapper,
  useElementSize,
} from './style';

const DropdownIndicator = ({ isOpen, icon, withSearch, ...props }) => {
  let DropdownIcon = null;
  DropdownIcon = (
    <Icon
      iconName="ChevronDown"
      size="20px"
      style={{
        transform: isOpen ? 'rotate(-180deg)' : 'rotate(0)',
        transition: 'all 0.3s ease-in-out',
      }}
    />
  );
  if (icon) DropdownIcon = icon;
  if (withSearch && isOpen)
    DropdownIcon = <Icon iconName="Magnifying" size="16px" />;
  return (
    <components.DropdownIndicator {...props}>
      {DropdownIcon}
    </components.DropdownIndicator>
  );
};

const Control = ({ controlWrapperRef, height, ...props }) => {
  return (
    <ControlWrapper height={height} ref={controlWrapperRef}>
      <components.Control {...props} />
    </ControlWrapper>
  );
};

const getFormated = (label, userInput) => {
  const regex = new RegExp(userInput, 'gi');
  const newText = label.replace(regex, (match) => Mark(match));

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: newText }} />;
};

const Option = ({ variant, innerProps, ...props }) => {
  const label = props?.label || '';
  const isDisabled = props?.isDisabled || false;
  const optionName = 'option-dropdown';
  if (variant === 'autocomplete') {
    const userInput = props?.selectProps?.inputValue || '';

    return (
      <components.Option
        {...props}
        innerProps={{ name: optionName, ...innerProps }}
      >
        {userInput.length ? getFormated(label, userInput) : label}
      </components.Option>
    );
  }

  if (variant === 'multi-select') {
    return (
      <components.Option
        {...props}
        innerProps={{ name: optionName, ...innerProps }}
      >
        <Checkbox type="checkbox" checked={props.isSelected} />{' '}
        <CheckboxLabel>{label}</CheckboxLabel>
      </components.Option>
    );
  }

  return isDisabled ? (
    <components.Option
      isDisabled
      {...props}
      styles={{ backgroundColor: 'red' }}
      innerProps={{
        name: optionName,
        style: {
          backgroundColor: '#F6F5F5',
          color: '#ADADAD',
          cursor: 'not-allowed',
        },
        ...innerProps,
      }}
    >
      {label}
    </components.Option>
  ) : (
    <components.Option
      {...props}
      innerProps={{ name: optionName, ...innerProps }}
    >
      {label}
    </components.Option>
  );
};

/* 
  !! Important:
  ! If you are using React Hook Form, ensure that you pass the 'control' props with control from useForm()
  ! No need to send props register, and value
*/

export const Dropdown = ({
  variant,
  name,
  disabled,
  defaultValue,
  placeholder,
  maxMenuHeight,
  options,
  width,
  height,
  zIndex,
  icon,
  leftIcon,
  withSearch,
  menuIsOpen,
  onChange,
  label,
  validation,
  errors,
  // register,
  id,
  control,
  borderColor,
  placeholderColor,
  idTargetPortal,
  isLoading,
}) => {
  const controlWrapperRef = useRef(null);
  const selectRef = useRef(null);
  const [isOpen, setIsOpen] = useState(menuIsOpen);
  const { widthElement } = useElementSize(controlWrapperRef);
  const { control: defaultControl } = useForm();

  const styles = BaseStyles({
    width,
    error: errors[name],
    leftIcon,
    zIndex,
    variant,
    isOpen,
    widthElement,
    borderColor,
    placeholderColor,
  });
  const isRequired = get(validation, 'required');

  const generateDropdownLabel = () => {
    if (!label) return null;

    return (
      <Typography
        size="1.2rem"
        margin="0 0 0.4rem 0"
        lineHeight="21px"
        color="blue80"
        weight={500}
        variant="div"
        className="dropdownLabel"
        style={{ display: 'flex' }}
      >
        {label}
        {isRequired && (
          <Typography
            variant="div"
            color="darkRed50"
            style={{
              marginTop: '4px',
            }}
          >
            *
          </Typography>
        )}
      </Typography>
    );
  };

  const handleOnChange = (e, onChangeController) => {
    onChange(e, name);
    const selectedValue = {
      // mimic event target of input html, if not react-hook-form will throw error
      target: {
        name,
        value: e,
      },
    };
    onChangeController(selectedValue);
    selectRef.current.blur();
  };

  if (isLoading)
    return (
      <DropdownWrapper className="dropdown" width={width}>
        {generateDropdownLabel()}
        <Select
          components={{
            DropdownIndicator: (props) =>
              DropdownIndicator({ ...props, isOpen, icon, withSearch }),
            Control: (props) =>
              Control({ ...props, height, controlWrapperRef }),
            Option: (props) => Option({ ...props, variant }),
          }}
          styles={styles}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </DropdownWrapper>
    );

  return (
    <DropdownWrapper className="dropdown" width={width}>
      {generateDropdownLabel()}
      <Controller
        control={control || defaultControl}
        name={name}
        rules={validation}
        defaultValue={defaultValue}
        render={({ field: { onChange: onChangeController, value, ref } }) => {
          return (
            <Select
              components={{
                DropdownIndicator: (props) =>
                  DropdownIndicator({ ...props, isOpen, icon, withSearch }),
                Control: (props) =>
                  Control({ ...props, height, controlWrapperRef }),
                Option: (props) => Option({ ...props, variant }),
              }}
              isMulti={Boolean(variant === 'multi-select')}
              closeMenuOnSelect={Boolean(variant !== 'multi-select')}
              isSearchable={withSearch}
              defaultValue={defaultValue}
              value={value || ''}
              options={options}
              isDisabled={disabled}
              name={name}
              placeholder={placeholder}
              styles={styles}
              onMenuOpen={() => variant !== 'basic' && setIsOpen(true)}
              onMenuClose={() => variant !== 'basic' && setIsOpen(false)}
              maxMenuHeight={maxMenuHeight}
              isClearable={false}
              hideSelectedOptions={false}
              menuPortalTarget={
                variant !== 'basic' &&
                idTargetPortal &&
                document?.getElementById(idTargetPortal)
              }
              menuIsOpen={menuIsOpen || undefined}
              // autoFocus={isOpen}
              // defaultMenuIsOpen={isOpen}
              onChange={(e) => handleOnChange(e, onChangeController)}
              ref={(select) => {
                selectRef.current = select;
                return ref;
              }}
              id={`select-${id}`}
            />
          );
        }}
      />
      {errors[name] && (
        <ErrorWrapper>
          <Typography color="error">{errors[name]?.message}</Typography>
        </ErrorWrapper>
      )}
    </DropdownWrapper>
  );
};

DropdownIndicator.propTypes = {
  isOpen: PropTypes.bool,
  icon: PropTypes.node,
  withSearch: PropTypes.bool,
};
DropdownIndicator.defaultProps = {
  isOpen: false,
  icon: null,
  withSearch: false,
};

Control.propTypes = {
  isOpen: PropTypes.bool,
  variant: PropTypes.string,
  controlWrapperRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLDivElement),
  }),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Control.defaultProps = {
  isOpen: false,
  variant: '',
  height: '',
  controlWrapperRef: { current: null },
};

Option.propTypes = {
  variant: PropTypes.string,
  selectProps: PropTypes.objectOf(
    PropTypes.shape({
      inputValue: PropTypes.string,
    })
  ),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  innerProps: PropTypes.shape({}),
};
Option.defaultProps = {
  variant: '',
  selectProps: null,
  label: '',
  isDisabled: false,
  isSelected: false,
  innerProps: {},
};

Dropdown.defaultProps = {
  variant: 'single-select',
  name: 'dropdown',
  disabled: false,
  defaultValue: undefined,
  placeholder: 'Choose Option',
  maxMenuHeight: 250,
  options: [],
  width: '100%',
  height: 40,
  zIndex: '5',
  icon: null,
  leftIcon: false,
  withSearch: false,
  menuIsOpen: false,
  label: null,
  onChange: () => {},
  validation: {},
  errors: {},
  control: null,
  borderColor: '',
  placeholderColor: '',
  idTargetPortal: '',
  isLoading: false,
};

Dropdown.propTypes = {
  variant: PropTypes.oneOf([
    'single-select',
    'multi-select',
    'autocomplete',
    'basic',
  ]),
  name: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    PropTypes.oneOf([undefined]),
  ]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  maxMenuHeight: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  zIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  leftIcon: PropTypes.bool,
  withSearch: PropTypes.bool,
  menuIsOpen: PropTypes.bool, // automatically open select options without click dropdown field first
  label: PropTypes.string,
  onChange: PropTypes.func,
  validation: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  control: PropTypes.shape({}),
  borderColor: PropTypes.string,
  placeholderColor: PropTypes.string,
  idTargetPortal: PropTypes.string,
  isLoading: PropTypes.bool,
};

/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Tooltip } from '../Tooltip';
import {
  Wrapper,
  Input,
  InputAdorment,
  Fieldset,
  Outer,
  ErrorMessageWrapper,
} from './style';

export const TextField = (props) => {
  const {
    onChange,
    onClick,
    onKeyDown,
    placeholder,
    disabled,
    id,
    type,
    register,
    name,
    validation,
    errors,
    label,
    labelMargin,
    width,
    borderRadius,
    padding,
    startAdornment,
    endAdornment,
    value,
    autoComplete,
    onFocus,
    onBlur,
    tooltipText,
    tooltipPlacement,
    tooltipPosition,
    tooltipWidth,
    tooltipWithIcon,
    tooltipIconName,
    tooltipIconColor,
    className,
    filled,
    bg,
  } = props;

  const hookForm = register?.(name, validation);
  const [focus, setFocus] = useState(false);
  const [typeState, setTypeState] = useState(type);

  const handleChange = (e) => {
    const {
      target: { value: targetValue },
    } = e;
    onChange(targetValue, name);
    if (register) {
      hookForm.onChange(e);
    }
  };

  const handleFocus = (e) => {
    const {
      target: { value: targetValue },
    } = e;
    onFocus(targetValue, name);
    setFocus(true);
  };

  const handleBlur = (e) => {
    const {
      target: { value: targetValue },
    } = e;
    onBlur(targetValue, name);
    setFocus(false);
  };

  const toggleVisibility = () => {
    if (typeState === 'password') return setTypeState('text');
    return setTypeState('password');
  };

  const isShowVisibilityIcon = type === 'password';
  const visibilityIconState =
    typeState === 'password' ? 'OutlinedVisibility' : 'OutlinedVisibilityOff';
  const isRequired = get(validation, 'required');

  return (
    <Outer width={width} className={`textfield ${className}`}>
      {label && (
        <Typography
          size="1.2rem"
          margin={labelMargin}
          lineHeight="21px"
          color="blue80"
          weight={500}
          className="textfieldLabel"
          variant={tooltipText ? 'div' : 'body'}
        >
          {label}
          {isRequired && <span className="asterisk">*</span>}
          {tooltipText && (
            <Tooltip
              text={tooltipText}
              placement={tooltipPlacement || 'upper'}
              position={tooltipPosition}
              width={tooltipWidth}
              withIcon={tooltipWithIcon}
            >
              <Icon
                className="infoIcon"
                iconName={tooltipIconName}
                color={tooltipIconColor}
                size="1.2rem"
              />
            </Tooltip>
          )}
        </Typography>
      )}
      <Wrapper
        startAdornment={!!startAdornment}
        disabled={disabled}
        endAdornment={!!endAdornment || isShowVisibilityIcon}
        filled={filled}
        bg={bg}
      >
        {startAdornment && (
          <InputAdorment position="start">{startAdornment}</InputAdorment>
        )}
        <Input
          onChange={handleChange}
          onClick={onClick}
          placeholder={placeholder}
          disabled={disabled}
          id={id || name}
          type={typeState}
          name={name}
          ref={hookForm?.ref}
          startAdornment={!!startAdornment}
          endAdornment={!!endAdornment || isShowVisibilityIcon}
          onKeyDown={onKeyDown}
          value={value}
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderRadius={borderRadius}
          padding={padding}
        />
        {(endAdornment || isShowVisibilityIcon) && (
          <InputAdorment position="end">
            {isShowVisibilityIcon ? (
              <Icon iconName={visibilityIconState} onClick={toggleVisibility} />
            ) : (
              endAdornment
            )}
          </InputAdorment>
        )}
        <Fieldset error={!!errors[name]} isFocus={focus} disabled={disabled} />
      </Wrapper>
      {errors[name] && (
        <ErrorMessageWrapper>
          <Typography color="error">{errors[name]?.message}</Typography>
        </ErrorMessageWrapper>
      )}
    </Outer>
  );
};
TextField.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  id: PropTypes.string,
  style: PropTypes.shape({}),
  register: PropTypes.func,
  name: PropTypes.string,
  validation: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  label: PropTypes.string,
  labelMargin: PropTypes.string,
  width: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  value: PropTypes.string,
  autoComplete: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  tooltipText: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  tooltipWidth: PropTypes.string,
  tooltipWithIcon: PropTypes.bool,
  tooltipIconName: PropTypes.string,
  tooltipIconColor: PropTypes.string,
  tooltipPosition: PropTypes.shape({}),
  className: PropTypes.string,
  filled: PropTypes.bool,
  bg: PropTypes.string,
};
TextField.defaultProps = {
  onChange: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  placeholder: 'Type...',
  disabled: false,
  type: 'text',
  id: null,
  style: {},
  register: null,
  name: '',
  validation: {},
  errors: {},
  label: null,
  labelMargin: '0 0 0.4rem 0',
  width: 'fit-content',
  borderRadius: '',
  padding: '',
  startAdornment: null,
  endAdornment: null,
  value: undefined,
  autoComplete: null,
  onFocus: () => {},
  onBlur: () => {},
  tooltipText: '',
  tooltipPlacement: '',
  tooltipWidth: '',
  tooltipWithIcon: true,
  tooltipIconName: 'InfoOutlined',
  tooltipIconColor: 'neutral90',
  tooltipPosition: {},
  className: '',
  filled: false,
  bg: undefined,
};

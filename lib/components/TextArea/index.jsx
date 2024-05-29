/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Typography } from '../Typography';
import {
  TextAreaWrapper,
  StyledTextArea,
  CharacterCount,
  ErrorMessage,
} from './styled';

export const TextArea = (props) => {
  const {
    id,
    label,
    placeholder,
    value,
    disabled,
    onChange,
    max,
    validation,
    register,
    name,
    errors,
  } = props;
  const [textLength, setTotalLength] = useState(0);
  const hookForm = register && register(name, validation);

  const handleChange = (event) => {
    const {
      target: { value: targetValue },
    } = event;
    setTotalLength(targetValue?.length);
    onChange(targetValue, name);
    if (register) {
      hookForm.onChange(event);
    }
  };
  const isRequired = get(validation, 'required');
  return (
    <TextAreaWrapper>
      <Typography
        id={`txt-${id}`}
        size="1.2rem"
        margin="0 0 0.4rem 0"
        lineHeight="21px"
        color="blue80"
        weight={500}
      >
        {label}
        {isRequired && <span className="asterisk">*</span>}
      </Typography>
      <StyledTextArea
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={max}
        disabled={disabled}
        error={!!errors[name]}
        register={register}
        ref={hookForm?.ref}
        value={value}
        name={name}
      />
      {errors[name] && (
        <ErrorMessage>
          <Typography color="error">{errors[name]?.message}</Typography>
        </ErrorMessage>
      )}
      <CharacterCount>
        <Typography size="1rem" lineHeight="15px" color="neutral80">
          {textLength}/{max}
        </Typography>
      </CharacterCount>
    </TextAreaWrapper>
  );
};

TextArea.defaultProps = {
  label: '',
  placeholder: 'Type...',
  value: undefined,
  max: 200,
  disabled: false,
  onChange: () => {},
  validation: {},
  register: null,
  name: null,
  errors: {},
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  max: PropTypes.number,
  validation: PropTypes.shape({}),
  register: PropTypes.func,
  name: PropTypes.string,
  errors: PropTypes.shape({}),
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { Typography } from '../Typography';
import { Container, ToggleContainer, Rectangle, Circle } from './styled';

const toggleSize = {
  default: {
    width: '56px',
    height: '32px',
  },
  medium: {
    width: '48px',
    height: '28px',
  },
  small: {
    width: '40px',
    height: '24px',
  },
};

const circleSize = {
  default: {
    width: '24px',
    height: '24px',
    left: '28px',
  },
  medium: {
    width: '20px',
    height: '20px',
    left: '24px',
  },
  small: {
    width: '16px',
    height: '16px',
    left: '20px',
  },
};

/* 
  !! Important:
  ! If you are using React Hook Form, ensure that you pass the 'control' props with control from useForm()
  ! No need to send props register, and value
*/

export const Toggle = ({
  mode,
  disabled,
  label,
  className,
  name,
  onChange,
  id,
  labelPlacement,
  control,
}) => {
  const [isActive, setIsActive] = useState(false);
  const { control: defaultControl } = useForm();

  const handleToggle = (onChangeController) => () => {
    if (!disabled) {
      const currentValue = !isActive;
      onChange(currentValue, name);
      setIsActive(currentValue);
      const targetValue = {
        target: {
          name,
          value: currentValue,
        },
      };
      onChangeController(targetValue);
    }
  };

  return (
    <Controller
      control={control || defaultControl}
      name={name}
      render={({ field: { onChange: onChangeController, value } }) => (
        <Container
          className={`toggle ${className}`}
          labelPlacement={labelPlacement}
        >
          <Typography size="1.2rem" lineHeight="18px" color="neutral80">
            {label}
          </Typography>
          <ToggleContainer
            className="toggle-container"
            role="button"
            tabIndex="0"
            disabled={disabled}
          >
            <Rectangle
              isActive={value}
              mode={toggleSize[mode]}
              disabled={disabled}
            />
            <Circle
              onClick={handleToggle(onChangeController)}
              isActive={value}
              mode={circleSize[mode]}
              disabled={disabled}
              id={`toggle-${id}`}
            />
          </ToggleContainer>
        </Container>
      )}
    />
  );
};

Toggle.propTypes = {
  mode: PropTypes.oneOf(['default', 'medium', 'small']),
  disabled: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  labelPlacement: PropTypes.oneOf(['top', 'left', 'right']),
  control: PropTypes.shape({}),
};

Toggle.defaultProps = {
  mode: 'default',
  label: 'Label',
  disabled: false,
  className: null,
  name: null,
  onChange: () => {},
  id: null,
  labelPlacement: 'top',
  control: {},
};

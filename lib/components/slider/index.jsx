/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RCSlider from 'rc-slider';
import get from 'lodash/get';
import { TextField } from '../Textfield';
import TooltipSlider from './tooltipSlider';
import { Wrapper } from './style';

export const Slider = (props) => {
  const { tipFormatter, range, disabled, onChange, ...rest } = props;
  const [leftSlider, setLeftSliderValue] = useState(get(props, 'value[0]'));
  const [rightSlider, setRightSliderValue] = useState(
    range ? get(props, 'value[1]') : get(props, 'value')
  );

  const tipHandleRender = (node, handleProps) => (
    <TooltipSlider
      value={handleProps.value}
      tipFormatter={tipFormatter}
      visible={handleProps.dragging}
    >
      {node}
    </TooltipSlider>
  );
  const handleInput = (val, name) => {
    if (val) {
      if (name === 'leftSlider')
        return onChange([leftSlider, get(props, 'value[1]')]);
      return onChange(
        range ? [get(props, 'value[0]'), rightSlider] : rightSlider
      );
    }
    return null;
  };
  const handleOnchangeSlider = (val) => {
    if (range) {
      const left = get(val, '[0]');
      const right = get(val, '[1]');
      setLeftSliderValue(left);
      setRightSliderValue(right);
      return onChange([left, right]);
    }
    setRightSliderValue(val);
    return onChange(val);
  };
  return (
    <Wrapper>
      {range && (
        <TextField
          width="4.8rem"
          placeholder={null}
          value={leftSlider}
          disabled={disabled}
          name="leftSlider"
          onBlur={handleInput}
          onChange={(val) => setLeftSliderValue(val)}
        />
      )}
      <RCSlider
        handleRender={tipHandleRender}
        range={range}
        disabled={disabled}
        onChange={handleOnchangeSlider}
        {...rest}
      />
      <TextField
        width="4.8rem"
        placeholder={null}
        disabled={disabled}
        value={rightSlider}
        name="rightSlider"
        onBlur={handleInput}
        onChange={(val) => setRightSliderValue(val)}
      />
    </Wrapper>
  );
};
Slider.defaultProps = {
  range: false,
  tipFormatter: undefined,
  min: 0,
  max: 100,
  marks: {},
  step: 1,
  disabled: false,
  defaultValue: 0,
  onChange: () => {},
};
Slider.propTypes = {
  range: PropTypes.bool,
  tipFormatter: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  marks: PropTypes.shape({}),
  step: PropTypes.number,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.shape([]), PropTypes.number]),
  onChange: PropTypes.func,
};

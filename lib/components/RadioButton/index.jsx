/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
  Radio,
  RadioCardContainer,
  RadioCardContentWrapper,
  RadioCardInput,
  RadioCardLabel,
  RadioCardTextWrapper,
  RadioContainer,
  RadioInput,
  RadioLabel,
} from './style';
import { Typography } from '../Typography';
import { Tooltip } from '../Tooltip';
import { Icon } from '../Icon';

const propTypes = {
  option: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  }),
  boxPosition: PropTypes.oneOf(['left', 'right']),
  groupName: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  textMargin: PropTypes.string,
  disabled: PropTypes.bool,
  withLabel: PropTypes.bool,
  standAloneWithLabel: PropTypes.bool,
  checkedValue: PropTypes.string,
  width: PropTypes.string,
  gap: PropTypes.string,
  id: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  validation: PropTypes.shape({}),
  variant: PropTypes.oneOf(['default', 'card', 'standalone']),
  direction: PropTypes.oneOf(['column', 'row']),
  grid: PropTypes.bool,
  gridCol: PropTypes.number,
  handleChange: PropTypes.func,
  register: PropTypes.func,
  radioSize: PropTypes.oneOf(['default', 'small']),
  wrapCards: PropTypes.bool,
};
const defaultProps = {
  option: [{}],
  data: {},
  groupName: 'default',
  boxPosition: 'left',
  size: '14px',
  color: '',
  textMargin: '',
  disabled: false,
  withLabel: true,
  standAloneWithLabel: false,
  checkedValue: '',
  width: '',
  validation: {},
  variant: 'default',
  gap: '0',
  borderColor: 'neutral70',
  direction: 'column',
  register: null,
  radioSize: 'default',
  grid: false,
  gridCol: 1,
  wrapCards: false,

  handleChange: (e) => {
    // eslint-disable-next-line no-console
    console.log(e.target);
  },
};

export const RadioButton = (props) => {
  const {
    id,
    option,
    data,
    boxPosition,
    groupName,
    handleChange,
    disabled,
    withLabel,
    standAloneWithLabel,
    size,
    color,
    textMargin,
    variant,
    width,
    direction,
    gap,
    borderColor,
    checkedValue,
    register,
    validation,
    radioSize,
    grid,
    gridCol,
    wrapCards,
  } = props;

  const hookForm = register?.(groupName, validation);
  const handleOnchange = (e) => {
    if (register) {
      return hookForm.onChange(e);
    }
    return handleChange(e);
  };

  if (variant === 'card') {
    return (
      <RadioCardContainer
        width={width}
        wrapCards={wrapCards}
        className="radioCardContainer"
      >
        {option.map((row) => (
          <RadioCardLabel
            key={`input-radio-${row.id}`}
            htmlFor={row.id}
            disabled={disabled}
            width={width}
            className="radioCardLabel"
          >
            <RadioCardInput
              type="radio"
              name={groupName}
              id={row.id}
              value={row.value}
              onChange={handleOnchange}
              disabled={disabled}
              checked={checkedValue ? row.value === checkedValue : null}
              ref={hookForm?.ref}
            />
            <RadioCardContentWrapper
              width={width}
              className="radioCardContentWrapper"
            >
              <RadioCardTextWrapper>
                <Typography
                  color="blue80"
                  size="1.4rem"
                  lineHeight="150%"
                  weight={400}
                >
                  {row.value}
                </Typography>
                <Typography
                  color="neutral70"
                  size="1rem"
                  lineHeight="150%"
                  weight={500}
                >
                  {row.subValue}
                </Typography>
              </RadioCardTextWrapper>
              {!isEmpty(row.tooltip) && (
                <Tooltip
                  placement={row.tooltip.placement}
                  withIcon
                  title={row.tooltip.title}
                  text={row.tooltip.text}
                  position={row.tooltip.position}
                  width={row.tooltip.width}
                >
                  <Icon
                    size="24px"
                    iconName="OutlinedCorporateInfo"
                    color="neutral60"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </Tooltip>
              )}
            </RadioCardContentWrapper>
          </RadioCardLabel>
        ))}
      </RadioCardContainer>
    );
  }

  if (variant === 'standalone') {
    return (
      <RadioContainer variant={variant}>
        <Radio variant={variant}>
          <RadioInput
            type="radio"
            name={groupName}
            id={data.id}
            value={data.value}
            onChange={handleOnchange}
            disabled={disabled}
            checked={checkedValue ? data.value === checkedValue : null}
            ref={hookForm?.ref}
            radioSize={radioSize}
          />
          <RadioLabel htmlFor={data.id} disabled={disabled}>
            <Typography color={color} size={size} margin={textMargin}>
              {standAloneWithLabel && data.value}
            </Typography>
          </RadioLabel>
        </Radio>
      </RadioContainer>
    );
  }

  return (
    <RadioContainer
      grid={grid}
      gridCol={gridCol}
      direction={direction}
      gap={gap}
      id={id}
    >
      {option.map((row, index) => {
        return boxPosition === 'right' ? (
          <Radio key={`key_${String(index)}`} boxPosition={boxPosition}>
            <RadioLabel htmlFor={row.id} disabled={disabled}>
              <Typography color={color} size={size} margin={textMargin}>
                {withLabel && row.value}
              </Typography>
            </RadioLabel>
            <RadioInput
              type="radio"
              name={groupName}
              id={row.id}
              value={row.value}
              onChange={handleOnchange}
              disabled={disabled}
              borderColor={borderColor}
              checked={checkedValue ? row.value === checkedValue : null}
              ref={hookForm?.ref}
              radioSize={radioSize}
            />
          </Radio>
        ) : (
          <Radio key={`key_${String(index)}`}>
            <RadioInput
              type="radio"
              name={groupName}
              id={row.id}
              value={row.value}
              onChange={handleOnchange}
              disabled={disabled}
              borderColor={borderColor}
              checked={checkedValue ? row.value === checkedValue : null}
              ref={hookForm?.ref}
            />
            <RadioLabel htmlFor={row.id} disabled={disabled}>
              <Typography color={color} size={size} margin={textMargin}>
                {withLabel && row.value}
              </Typography>
            </RadioLabel>
          </Radio>
        );
      })}
    </RadioContainer>
  );
};

RadioButton.defaultProps = defaultProps;
RadioButton.propTypes = propTypes;

export default RadioButton;

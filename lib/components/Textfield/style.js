import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Outer = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: ${({ width }) => width};
  border: 0;
  min-width: 0;
  padding: 0;
  .asterisk {
    color: ${theme.colors.darkRed50};
  }
  .infoIcon {
    margin-left: ${theme.spacings.spacing02};
    height: 1.2rem;
    transform: translateY(0.3rem);
  }
`;
export const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  background-color: ${({ disabled, filled }) =>
    disabled || filled ? theme.colors.neutral20 : theme.colors.transparent};
  ${({ bg }) => ({
    'background-color': bg,
  })}
  border-radius: ${({ radius }) => radius || theme.radius.small};
  ${({ endAdornment, startAdornment }) => {
    if (endAdornment && startAdornment) {
      return {
        paddingLeft: theme.spacings.spacing04,
        paddingRight: theme.spacings.spacing04,
      };
    }
    if (startAdornment) {
      return {
        paddingLeft: theme.spacings.spacing04,
      };
    }
    if (endAdornment) {
      return {
        paddingRight: theme.spacings.spacing04,
      };
    }
    return {
      padding: 0,
    };
  }}
`;

export const Input = styled.input`
  position: relative;
  color: ${theme.colors.blue80};
  font-size: 1.4rem;
  outline: none;
  line-height: 1.6rem;
  border-radius: ${({ radius }) => radius || theme.radius.large};
  width: 100%;
  padding: ${({ padding }) => padding || theme.spacings.spacing04};
  border: none;
  background-color: ${theme.colors.transparent};
  ${({ endAdornment, startAdornment, padding: paddingValue }) => {
    let padding = paddingValue || theme.spacings.spacing04;
    if (endAdornment) {
      padding =
        paddingValue ||
        `${theme.spacings.spacing04} 0 ${theme.spacings.spacing04} ${theme.spacings.spacing04}`;
    } else if (startAdornment) {
      padding =
        paddingValue ||
        `${theme.spacings.spacing04} 0 ${theme.spacings.spacing04} 0`;
    }
    return {
      padding,
    };
  }}
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${theme.colors.neutral60};
  }
  &:disabled {
    background-color: ${theme.colors.neutral20};
    cursor: not-allowed;
    color: ${theme.colors.neutral60};
  }
  // remove autocomplete background color changes
  &:-webkit-autofill {
    -webkit-background-clip: text;
  }
  ${({ type }) =>
    type === 'number' &&
    `
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  `}
  ${theme.responsive.mobile`
    line-height: 1.2rem;
    height: 1.2rem;
  `}
`;
export const Fieldset = styled.fieldset`
  position: absolute;
  inset: 0px 0px 0px;
  border-radius: inherit;
  overflow: hidden;
  border: 1px solid ${theme.colors.neutral50};
  min-width: 0%;
  pointer-events: none;
  text-align: left;
  margin: ${theme.spacings.spacing00};
  padding: ${theme.spacings.spacing00} ${theme.spacings.spacing04};
  border-color: ${({ isFocus, error }) =>
    isFocus && !error ? theme.colors.primary : theme.colors.neutral50};
  ${({ error, isFocus, disabled }) => {
    let borderColor = theme.colors.neutral50;
    if (error) borderColor = theme.colors.error;
    else if (isFocus && !disabled) borderColor = theme.colors.primary;
    return {
      borderColor,
    };
  }}
`;
export const InputAdorment = styled.div`
  display: flex;
  height: 0.01em;
  max-height: 2em;
  align-items: center;
  white-space: nowrap;
  ${({ position }) => {
    if (position === 'start') {
      return {
        marginRight: theme.spacings.spacing02,
      };
    }
    return {
      marginLeft: theme.spacings.spacing02,
    };
  }}
`;

export const ErrorMessageWrapper = styled.div`
  position: absolute;
  bottom: -14px;
  left: 0;
`;

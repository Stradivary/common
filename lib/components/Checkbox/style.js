import styled, { css } from 'styled-components';
import {
  CheckboxChecked,
  CheckboxCheckedDisabled,
  CheckboxIndeterminate,
  CheckboxIndeterminateDisabled,
} from '../../assets';
import { theme } from '../../styles/theme';

const CheckboxContainer = styled.div(({ type, gridCol }) => ({
  display: type === 'grid' ? 'grid' : '',
  gridTemplateColumns: type === 'grid' ? `repeat(${gridCol}, 1fr)` : '',
  marginBottom: '3rem',
}));

const CheckboxItem = styled.div`
  margin: 1rem 0 0;
  display: flex;
  gap: 8px;
  align-items: center;
  ${({ withBorder }) =>
    withBorder &&
    css`
      padding: 0.8rem 1.6rem 1.6rem 1.6rem;
      border-bottom: 1px solid ${theme.colors.neutral40};
    `}
`;

const CheckboxSubItem = styled(CheckboxItem)`
  margin-left: 3rem;
`;

const CheckboxInput = styled.input`
  position: relative;
  appearance: none;
  margin: 0;
  width: 19px;
  height: 19px;
  border: 3px solid ${theme.colors.neutral50};
  border-radius: ${theme.radius.small};
  transition: all 0.1s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')} !important;

  &:checked {
    border-color: ${theme.colors.primary};
  }

  &:checked::after {
    // TODO: fix broken image resolution and styling
    // content: '${({ indeterminate }) => (indeterminate ? '–' : '✔')}';
    content: '';
    background-image: url(${({ disabled, indeterminate }) => {
      if (disabled) {
        if (indeterminate) return CheckboxIndeterminateDisabled;
        return CheckboxCheckedDisabled;
      }
      if (indeterminate) return CheckboxIndeterminate;
      return CheckboxChecked;
    }});
    position: absolute;
    inset: ${({ indeterminate }) =>
      indeterminate ? '-2px 0 0 -3px' : '-3px 0 0 -2px'};
    width: inherit;
    height: inherit;
    background-repeat: no-repeat;
    background-size: ${({ indeterminate }) =>
      indeterminate ? 'cover' : 'contain'};
  }

  &:focus::after {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    border-color: ${theme.colors.neutral50};
    cursor: no-drop;
  }

  &:disabled::after {
    cursor: no-drop;
  }
`;

const CheckboxLabel = styled.label`
  color: ${({ disabled }) => disabled && theme.colors.neutral50};
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
`;

export {
  CheckboxContainer,
  CheckboxItem,
  CheckboxSubItem,
  CheckboxInput,
  CheckboxLabel,
};

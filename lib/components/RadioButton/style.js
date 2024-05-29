import styled from 'styled-components';
import { theme } from '../../styles/theme';

const RadioContainer = styled.div({
  display: ({ grid }) => (grid ? 'grid' : 'flex'),
  gridTemplateColumns: ({ gridCol }) => `repeat(${gridCol}, 1fr)`,
  flexDirection: ({ direction }) => direction,
  gap: ({ gap }) => gap,
  marginBottom: ({ variant }) => (variant !== 'standalone' ? '3rem' : 0),
});

const Radio = styled.div`
  margin: ${({ variant }) => (variant !== 'standalone' ? '1rem 0 0' : 0)};
  display: flex;
  gap: ${theme.spacings.spacing03};
  align-items: center;
  ${({ boxPosition }) =>
    boxPosition === 'right' && 'justify-content: flex-end;'}
`;

const RadioInput = styled.input`
  appearance: none;
  margin: 0;
  border: 2px solid ${({ borderColor }) => theme.colors[borderColor]};
  border-radius: ${theme.radius.rounded};
  transition: all 0.1s ease-in-out;
  ${({ radioSize }) =>
    radioSize === 'small' &&
    `
    border-width: 1px;
  `}
  &::after {
    content: '';
    display: block;
    border-radius: ${theme.radius.rounded};
    width: 10px;
    height: 10px;
    margin: 3px;
    cursor: pointer;
    background: ${theme.colors.neutral5};
    ${({ radioSize }) =>
      radioSize === 'small' &&
      `
      width: 7.3px;
      height: 7.3px;
      margin: 2px;
    `}
  }

  &:checked {
    border-color: ${theme.colors.primary};
  }

  &:checked::after {
    background: ${theme.colors.primary};
  }

  &:checked:disabled::after {
    background: ${theme.colors.neutral50};
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

const RadioLabel = styled.label`
  color: ${({ disabled }) => disabled && theme.colors.neutral50};
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
`;

const RadioCardContainer = styled.div`
  display: flex;
  gap: 16px;
  width: ${({ width }) => width};
  ${({ wrapCards }) => theme.responsive.mobile`
    flex-flow: ${wrapCards ? 'nowrap' : 'wrap'}
  `}
`;

const RadioCardContentWrapper = styled.div`
  display: flex;
  padding: 16px 24px;
  width: ${({ width }) => width};
  align-items: center;
  justify-content: space-between;
`;

const RadioCardTextWrapper = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  width: ${({ width }) => width};
`;

const RadioCardLabel = styled.label`
  display: flex;
  width: ${({ width }) => width || 'fit-content'};
  outline: 2px solid #ececec;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? 'inherit' : theme.colors.blue5};
    outline: ${({ disabled }) =>
      disabled ? '2px solid #ececec' : `2px solid ${theme.colors.primary}`};
  }
`;

const RadioCardInput = styled.input.attrs({ type: 'radio' })`
  display: none;

  &::after {
    display: none;
  }

  &:checked ~ ${RadioCardContentWrapper} {
    outline: 2px solid ${theme.colors.primary};
    background-color: ${theme.colors.blue5};
    border-radius: 8px;
    z-index: 1;
  }

  &:focus ~ ${RadioCardContentWrapper} {
    outline: 2px solid ${theme.colors.primary};
    background-color: ${theme.colors.blue5};
    border-radius: 8px;
  }

  &:disabled ~ ${RadioCardContentWrapper} {
    cursor: not-allowed;
  }
`;

export {
  RadioContainer,
  Radio,
  RadioInput,
  RadioLabel,
  RadioCardContainer,
  RadioCardContentWrapper,
  RadioCardTextWrapper,
  RadioCardLabel,
  RadioCardInput,
};

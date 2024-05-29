/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  .asterisk {
    color: ${({ theme }) => theme.colors.darkRed50};
  }
`;

export const StyledTextArea = styled.textarea`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  height: 136px;
  padding: ${({ theme }) => theme.spacings.spacing04};
  font-size: 1.4rem;
  border-radius: 4px;
  border: 1px solid
    ${({ disabled, error, theme }) =>
      disabled
        ? theme.colors.neutral50
        : error
          ? theme.colors.darkRed50
          : theme.colors.neutral40};
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.neutral20 : theme.colors.neutral5};
  outline: none;
  resize: vertical;

  &:focus {
    border: none;
    outline: 1.5px solid
      ${({ error, theme }) =>
        error ? theme.colors.darkRed50 : theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral60};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral60};
  }
`;

export const CharacterCount = styled.div`
  position: absolute;
  bottom: -14px;
  right: 0;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  bottom: -14px;
  left: 0;
`;

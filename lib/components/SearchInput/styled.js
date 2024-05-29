import styled from 'styled-components';

export const SearchInputComponent = styled.div`
  display: flex;
  margin-left: ${({ margin }) => margin || '10px'};
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #adadad;
  border-radius: 4px;
  transition: all 0.5s;
  width: ${({ width }) => width};
  padding-right: 1rem;
  background-color: white;
  height: 40px;

  &:focus-within {
    border: 1px solid black;
  }

  &.hasDanger {
    border: 1px solid red;
  }
`;

export const Input = styled.input`
  border-radius: inherit;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1.4rem;
  width: 100%;

  &:focus {
    & ~ ${InputContainer} {
      border-color: grey;
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & > i {
    cursor: pointer;
  }
`;

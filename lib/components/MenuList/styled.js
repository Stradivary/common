/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const ParentContainer = styled.div`
  margin: 5px 10px;
`;

export const IconContainer = styled.div`
  margin-right: 8px;
  margin-left: 12px;
`;

export const LabelContainer = styled.div`
  flex: 1;
  font-size: 12px;
  margin-left: 8px;
`;

export const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0 0 4px;
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  margin-left: 10px;
  width: ${(props) => props.width};
  height: 42px;
  border-radius: ${(props) =>
    props.isFirst ? '4px 4px 0 0' : props.isLast ? '0 0 4px 4px' : '0'};
  background-color: ${(props) => (props.isSelected ? '#001A41' : 'white')};
  box-shadow: ${(props) =>
    props.isLast
      ? '2px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1)'
      : '2px 0px 2px rgba(0, 0, 0, 0.1)'};

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#001A41' : '#eaf4ff')};
    cursor: pointer;
  }
`;

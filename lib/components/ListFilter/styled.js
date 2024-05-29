import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

export const FilterContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-top: -10px;
`;

export const FilterItem = styled.div`
  background-color: #eaf4ff;
  padding: 10px;
  border-radius: 4px;
  margin-right: 4px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 78px;
  height: 22px;

  &:last-child {
    margin-right: 0;
  }
`;

export const IconWithMargin = styled.div`
  margin: 2px 0 0 6px;
  cursor: pointer;
  align-self: right;
`;

export const Ellipsis = styled.div`
  padding: 10px;
  margin-top: 6px;
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'block')};
  margin-top: 6px;
  margin-left: -2px;
  width: 420px;
  min-height: 100px;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

export const FilterContainerModal = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 6px;
  background-color: white;
`;

export const ButtonStyled = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledTypography = styled.div`
  display: block;
  margin-top: 6px;
  cursor: pointer;
  text-decoration: underline;
`;

export const StyledDataFilter = styled.div`
  font-family: Poppins;
  font-size: 10px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.02em;
  text-align: left;
  font-color: #001a41;
`;

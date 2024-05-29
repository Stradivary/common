import styled from 'styled-components';

export const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;

export const TabContainer = styled.div`
  width: 100%;
  display: flex;
  height: 38px;
  margin-top: 8px;
  justify-content: space-between;
`;

export const FooterContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
`;

export const StyledTextHeader = styled.div`
  color: #001a41;
  cursor: pointer;
  margin-top: 8px;
`;

export const StyledTextFooter = styled.div`
  color: #0055b6;
  cursor: pointer;
  margin-top: 8px;
`;

export const StyledTextLink = styled.div`
  color: #0055b6;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 8px;
`;

export const StyledNotification = styled.div`
  width: 300px;
  padding: 8px;
  overflow-y: auto;
  max-height: 320px;
`;

export const StyledData = styled.div`
  padding: 8px;
  border-bottom: 1.5px solid #d8d8d8;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
`;

export const StyledIconLeft = styled.div`
  margin-right: 8px;
  margin-top: -2rem;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 32px;
    height: 32px;
    background-color: ${(props) => {
      switch (props.type) {
        case 'Agreement':
          return '#EAF4FF';
        case 'Warning':
          return '#FFE9ED';
        case 'General':
          return '#FFF2CB';
        default:
          return '#FFF2CB';
      }
    }};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  svg {
    position: relative;
    z-index: 1;
  }
`;

export const StyledIconRight = styled.div`
  margin-right: 2px;
  margin-left: 6px;
  position: relative;
  top: -20px;
  left: 10px;
`;

export const StyledFlexContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  margin-top: 8px;
`;

export const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => (props.isRead ? '#666666' : '#001a41')};
  margin-left: 6px;
`;

export const StyledDate = styled.div`
  color: #adadad;
  margin-top: 8px;
  margin-left: 6px;
`;

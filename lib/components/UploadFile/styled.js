import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledUploadLabel = styled.label`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  text-align: center;
  line-height: 150%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) =>
    disabled ? theme.colors.neutral50 : theme.colors.primary};

  ${({ variant, type }) => {
    if (variant === 'dragAndDrop') {
      if (type === 'button') {
        return `
          font-size: 1rem;
          font-weight: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px 8px;
          border: 1px solid ${theme.colors.primary};
          border-radius: ${theme.radius.small};
        `;
      }

      if (type === 'photo') {
        return `
          width: Hug (135px);
          height: Fixed (44px);
          padding: 12px 24px 12px 24px;
          border-radius: 4px;
          border: 1px;
          gap: 8px;
          border: 1px solid #0055B6;
          display: flex;
          align-items: center;
          align-self: center;
          margin-left: 20px;
        `;
      }

      return `
        font-size: 1.2rem;
        text-decoration: underline;
        font-weight: 500;
        cursor: pointer;
        text-underline-offset: 2px;
        margin-left: 8px;
      
        @media screen and (max-width: 480px) {
          margin-left: 0;
        }
      `;
    }

    return `
      font-size: 1.4rem;
      height: 100%;
      text-decoration: underline;
      font-weight: 600;
      width: 100%;
    `;
  }}
`;

export const StyledCustomBodyText = styled.p`
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
  line-height: 15px;
  color: ${theme.colors.neutral70};
  max-width: 357px;
`;

export const StyledProgressWrapper = styled.div`
  height: 4px;
  width: 309px;
  border-radius: 5px;
  background-color: ${theme.colors.neutral20};
  overflow: hidden;
  display: flex;
  align-items: center;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const StyledProgressInner = styled.div`
  height: 100%;
  width: ${({ progress }) => (progress === 100 ? '100%' : `${progress}%`)};
  background-color: ${theme.colors.primary};
  transition: width 0.3s ease-in-out;
`;

export const StyledFlexDiv = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap || 0};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  outline: ${({ outline }) => outline};
  border-radius: ${({ borderRadius }) => borderRadius};
  cursor: ${({ cursor }) => cursor};
  box-sizing: border-box;
  min-height: ${({ minHeight }) => minHeight};
  ${({ type }) => {
    if (type === 'photo') {
      return `
        cursor: pointer;
        width: Hug (135px);
        height: Fixed (44px);
        padding: 12px 24px 12px 24px;
        border-radius: 4px;
        border: 1px;
        gap: 8px;
        border: 1px solid #0055B6;
        display: flex;
        align-items: center;
        align-self: center;
        margin-left: 20px;
      `;
    }
    return ``;
  }}
`;

export const ButtonUploadPhoto = styled.div`
  cursor: pointer;
  width: Hug (135px);
  height: Fixed (44px);
  padding: 12px 24px 12px 24px;
  border-radius: 4px;
  border: 1px;
  gap: 8px;
  border: 1px solid #0055b6;
  display: flex;
  align-items: center;
  align-self: center;
  margin-left: 20px;
`;

export const StyledGridDiv = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
`;

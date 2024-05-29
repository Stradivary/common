import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { hexToRGBA } from '../../utils';

const bgBackdrop = theme.colors.neutral80;
export const Wrapper = styled.div(
  ({ visible, position, zIndex, background, inset }) => ({
    minHeight: '100vh',
    width: '100%',
    display: visible ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    background: background || hexToRGBA(bgBackdrop, 0.5),
    position,
    inset,
    overflow: 'hidden',
    zIndex,
    transition: 'all .3s ease-in-out',
  })
);

export const ModalContainer = styled.div`
  position: relative;
  width: ${({ width }) => width};
  box-shadow: 0.4rem 0.4rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: ${theme.radius.small};
  flex-direction: column;
  align-items: ${({ align }) => align && align};
  max-height: ${({ maxHeight }) => maxHeight};
  overflow: ${({ overflow }) => overflow};
  background-color: ${theme.colors.neutral5};
  ${({ gap }) => gap && `gap: ${gap};`}
  ${theme.responsive.mobile`
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    box-shadow: none;
    max-height: 100%;
  `}
`;
export const ContentWrapper = styled.div`
  padding: ${({ padding }) => padding || theme.spacings.spacing07};
  display: ${({ display }) => display || 'flex'};
  padding-top: 0;
  z-index: 1;
`;
export const CloseBtn = styled.div`
  position: absolute;
  cursor: pointer;
  top: ${({ padding }) => padding || theme.spacings.spacing07};
  right: ${({ padding }) => padding || theme.spacings.spacing07};
  ${({ showTitle }) => {
    if (showTitle) {
      return {
        top: '50%',
        transform: 'translateY(-50%)',
        right: theme.spacings.spacing07,
      };
    }
    return null;
  }}
`;

export const HeaderSection = styled.div`
  position: relative;
  width: 100%;
  padding: ${theme.spacings.spacing05} ${theme.spacings.spacing06}
    ${theme.spacings.spacing05} ${theme.spacings.spacing06};
  border-bottom: ${({ haveTitle }) =>
    haveTitle && `1px solid ${theme.colors.gray30}`};
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  border-radius: ${theme.radius.small} ${theme.radius.small} 0 0;
  margin-bottom: ${theme.spacings.spacing05};
  box-sizing: border-box;
  background-color: ${theme.colors.neutral5};
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;

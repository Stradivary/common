import styled, { css } from 'styled-components';
import { colors, radius, spacings } from '../../styles';

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  font-family: 'Poppins';
  --font-size: 1.6rem;
  --bg-primary: ${colors.neutral80};
  & > * {
    --font-size: var(--font-size);
  }
`;

export const DefaultPlacement = (position) => css`
  top: ${position.top || 'calc(300% - var(--font-size))'};
  left: ${position.left || '50%'};
  transform: ${position.transform || 'translateX(-50%)'};

  &::before {
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 0.5rem 0.8rem 0.5rem;
    border-color: transparent transparent var(--bg-primary) transparent;
  }
`;

export const UpperPlacement = (position) => css`
  top: ${position.top || 'calc(-100% - var(--font-size))'};
  bottom: ${position.bottom || '100%'};
  transform: ${position.transform || 'translateX(-20%)'};

  &::before {
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0.8rem 0.5rem 0 0.5rem;
    border-color: var(--bg-primary) transparent transparent transparent;
  }
`;

export const LeftPlacement = (position) => css`
  top: ${position.top || 'calc(50% - var(--font-size))'};
  bottom: ${position.bottom || '-50%'};
  right: ${position.right || '50%'};
  transform: ${position.transform || 'translateX(-40%)'};

  &::before {
    top: 50%;
    left: 99%;
    transform: translateY(-50%);
    border-width: 0.5rem 0 0.5rem 0.8rem;
    border-color: transparent transparent transparent var(--bg-primary);
  }
`;

export const RightPlacement = (position) => css`
  top: ${position.top || 'calc(50% - var(--font-size))'};
  bottom: ${position.bottom || '-50%'};
  left: ${position.left || '50%'};
  transform: ${position.transform || 'translateX(40%)'};

  &::before {
    top: 50%;
    left: -4%;
    transform: translateY(-50%);
    border-width: 0.5rem 0.8rem 0.5rem 0;
    border-color: transparent var(--bg-primary) transparent transparent;
  }
`;

export const TooltipWrapper = styled.div`
  position: absolute;
  background-color: var(--bg-primary);
  color: white;
  padding: ${spacings.spacing04};
  border-radius: ${radius.large};
  z-index: 3;
  min-width: 15rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  font-size: var(--font-size);
  width: ${({ width }) => width};

  &::before {
    content: '';
    position: absolute;
    border-style: solid;
  }

  p {
    margin: 0;
  }

  ${(props) => {
    const { placement, position } = props;
    switch (placement) {
      case 'left':
        return LeftPlacement(position);
      case 'bottom':
        return DefaultPlacement(position);
      case 'right':
        return RightPlacement(position);
      case 'upper':
        return UpperPlacement(position);
      default:
        return '';
    }
  }}
`;

export const Divider = styled.div`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
`;

export const TextWrapper = styled.div`
  margin-left: 0.6rem;
`;

export const TitleSpacing = styled.div`
  padding-bottom: ${spacings.spacing04};
`;

export const ContentSpacing = styled.div`
  margin-top: 0.5rem;
`;

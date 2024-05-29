import styled from 'styled-components';
import { theme } from '../../styles/theme';

const ContainerPagination = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ position }) => position};
  align-items: center;
  padding: theme.spacings.spacing02;
  ${() => theme.responsive.mobile`
   flex-direction: column;
   gap: ${theme.spacings.spacing05};
  `}
  ${() => theme.responsive.tabletsm`
   flex-direction: column;
   gap: ${theme.spacings.spacing02};
  `}
  ${() => theme.responsive.tablet`
   flex-direction: column;
   gap: ${theme.spacings.spacing02};
  `}
`;

const ItemIndicator = styled.div`
  display: flex;
  height: 37px;
  align-items: center;
  ${() => theme.responsive.mobile`
   width: 100%;
  `}
  ${() => theme.responsive.tabletsm`
   width: 100%;
  `}
  ${() => theme.responsive.tablet`
   width: 100%;
  `}
`;

const ItemIndicatorContainer = styled.div({
  display: 'flex',
  height: 37,
  alignItems: 'center',
  gap: theme.spacings.spacing02,
});

const PaginationChoose = styled.div({
  display: 'flex',
  gap: '8px',
  height: 37,
  alignItems: 'center',
});

const PaginationInput = styled.div({
  display: 'flex',
  height: 37,
  alignItems: 'center',
  gap: theme.spacings.spacing02,
});

const PaginationChooseItem = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  userselect: none;
  cursor: pointer;
  border-bottom: ${({ isSelected }) =>
    isSelected ? `1px solid ${theme.colors.primary}` : 'none'};

  ${({ isSelected }) => theme.responsive.mobile`
   display: ${isSelected ? 'flex' : 'none'};
  `}
`;

const ArrowContainer = styled.div((props) => ({
  width: 36,
  height: 36,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  cursor: props.disabled ? 'no-drop' : 'pointer',
  transform: props.isNext ? 'rotate(180deg)' : 'rotate(0deg)',
  '> div': {
    cursor: props.disabled ? 'no-drop' : 'pointer',
  },
}));

const ThreeDot = styled.div`
  display: flex;
  ${() => theme.responsive.mobile`
    display: none;
  `}
`;

export {
  ContainerPagination,
  PaginationChoose,
  PaginationChooseItem,
  ArrowContainer,
  ThreeDot,
  ItemIndicator,
  ItemIndicatorContainer,
  PaginationInput,
};

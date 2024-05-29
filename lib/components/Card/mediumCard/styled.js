import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import widgetAggrement1 from '../../../assets/images/widgetAggrement1.webp';
import widgetAggrement2 from '../../../assets/images/widgetAggrement2.webp';
import widgetAggrement3 from '../../../assets/images/widgetAggrement3.webp';
import widgetAggrement4 from '../../../assets/images/widgetAggrement4.webp';
import { Button } from '../../Button';

const bgType = (type) => {
  if (type === 'type1') {
    return widgetAggrement1;
  }
  if (type === 'type2') {
    return widgetAggrement2;
  }
  if (type === 'type3') {
    return widgetAggrement3;
  }
  if (type === 'type4') {
    return widgetAggrement4;
  }
  return widgetAggrement1;
};

export const MediumCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ bgColor }) =>
    bgColor || 'linear-gradient(340deg, #01035f 0%, #00c0ff 100%)'};

  /* Additional styles */
  background-image: ${({ type }) => `url(${bgType(type)})` || '15rem'};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: ${({ width }) => width || '20rem'};
  height: ${({ height }) => height || '261px'};
  border: 0.5px solid #cccccc;
  border-radius: 16px 0px 16px 0px;
`;

export const MediumCardRankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  background: ${({ bgColor }) =>
    bgColor || 'linear-gradient(340deg, #01035f 0%, #00c0ff 100%)'};

  /* Additional styles */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: ${({ width }) => width || '20rem'};
  height: ${({ height }) => height || '261px'};
  border: 0.5px solid #cccccc;
  border-radius: 16px 0px 16px 0px;
  background: radial-gradient(
    95.31% 95.31% at 0% 6.25%,
    #ee968e 0%,
    #9d0d0d 49.27%,
    #c22d4a 98.75%
  );
`;

export const PaddingCardWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacings.spacing05,
  width: 'auto',
  height: '-webkit-fill-available',
});

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ position }) => position || 'left'};
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: space-between;
  margin-top: 10px;
`;
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

export const FlexView = styled.div`
  display: flex;
  gap: ${({ nogap }) => (nogap ? 0 : '0.8rem')};
  align-self: flex-end;
  overflow: hidden;
`;

export const FlexBetween = styled.div`
  display: flex;
  justifycontent: space-between;
  flex: 1;
  padding: ${({ nopadding }) => (nopadding ? '12px 0px' : `12px 16px`)};
  gap: 1rem;
`;

export const WidgetOpportunity = styled(Button)`
  display: grid;
  justify-items: center;
  width: 100px;
  padding: 12px;
  border: 0px solid;
  text-decoration: auto;
  border-radius: 12px 0px 12px 0px;
  gap: 8px;
  background: linear-gradient(
    112.8deg,
    #ee8e8e 0%,
    #c22d4a 35.79%,
    #b01919 70.41%
  );

  &:hover,
  > p:hover {
    color: ${theme.colors.secondary};
  }
`;

export const RowContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 0 5px 0;

  & p {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & p:first-child {
    width: 20%;
  }

  @media (max-width: 767px) {
    width: 100%;
    display: flex;
    justify-content: left;
    gap: 16px;

    & p:first-child {
      padding-right: 0;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const FlexOne = styled.div`
  flex: 1;
`;

export const FlexOneLink = styled(Button)`
  flex: 1;
  display: grid;
  text-decoration: auto;
  padding: 10px 10px;
  &:hover {
    color: ${theme.colors.neutral5};
    border-radius: 12px 0px 12px 0px;
    background: linear-gradient(
      112.8deg,
      #ee8e8e 0%,
      #c22d4a 35.79%,
      #b01919 70.41%
    );
    a:hover .text-color {
      color: ${theme.colors.neutral5};
    }
  }
`;

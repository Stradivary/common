import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  MediumCardWrapper,
  HeaderWrapper,
  ContentWrapper,
  PaddingCardWrapper,
  TextWrapper,
  FlexView,
  FlexBetween,
  WidgetOpportunity,
  RowContainer,
  FlexOneLink,
} from './styled';
import { Icon } from '../../Icon';
import { Typography } from '../../Typography';
import { Checkpoints, formatDate } from '../../../utils';

const formatNumber = (num) => {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(1)}`;
  }
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}`;
  }
  return num.toString();
};

const formatValue = (num) => {
  if (num >= 1e12) {
    return `Tn`;
  }
  if (num >= 1e9) {
    return `Bn}`;
  }
  if (num >= 1e6) {
    return `Mn`;
  }
  if (num >= 1e3) {
    return `K`;
  }
  return num.toString();
};

const operator = (first, second) => {
  const result = first - second || 0;
  if (result < 0) {
    return `${result}`;
  }
  return `+ ${result}`;
};

const generateRowWithValue = (value, name) => {
  return (
    <RowContainer key={name}>
      <Typography color="neutral80" size="11px" weight={700} lineHeight="13px">
        {value}
      </Typography>
      <Typography color="neutral70" size="10px" weight={400} lineHeight="13px">
        {name}
      </Typography>
    </RowContainer>
  );
};

const MediumCard = (props) => {
  const {
    header: { position },
    content: { text, subText },
    data,
    description,
    type,
    monthAndYear,
    ...rest
  } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MediumCardWrapper {...rest} type={type}>
      <PaddingCardWrapper>
        <HeaderWrapper position={position}>
          <TextWrapper>
            <Typography
              color="neutral80"
              size="16px"
              weight={700}
              lineHeight={2}
            >
              {text}
            </Typography>
            <Typography
              color="neutral70"
              size="10px"
              weight={400}
              lineHeight={1}
            >
              {subText}{' '}
              <span style={{ fontWeight: 'bold' }}>{monthAndYear}.</span>
            </Typography>
          </TextWrapper>
        </HeaderWrapper>
        {text === 'Leads' ? (
          <ContentWrapper>
            <FlexBetween>
              <FlexOneLink
                id="btn-link-row"
                variant="link"
                to={Checkpoints.leadsList}
                color="neutral80"
              >
                <Typography className="text-color" size="40px" weight={700}>
                  {data?.collectionIncomingLead?.totalLead || 0}
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <Typography
                    className="text-color"
                    size="10px"
                    weight={500}
                    style={{ maxWidth: 100 }}
                  >
                    Total Incoming Leads
                  </Typography>
                  <Icon iconName="ChevronRight" size="20px" color="neutral40" />
                </div>
                <Typography
                  className="text-color"
                  size="10px"
                  weight={500}
                  lineHeight="20px"
                >
                  <span style={{ fontWeight: 'bold' }}>
                    {operator(
                      data?.collectionIncomingLead?.totalLead,
                      data?.collectionIncomingLead?.previousMonthTotalLead
                    )}
                  </span>{' '}
                  Dari bulan lalu
                </Typography>
              </FlexOneLink>
              <FlexOneLink
                id="btn-link-row}"
                variant="link"
                to={Checkpoints.leadsList}
                color="neutral80"
              >
                <Typography className="text-color" size="40px" weight={700}>
                  {data?.collectionQualifiedLead?.totalLead}
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography
                    className="text-color"
                    size="10px"
                    weight={500}
                    style={{ maxWidth: 100 }}
                  >
                    Total Qualified Leads
                  </Typography>
                  <Icon iconName="ChevronRight" size="20px" color="neutral40" />
                </div>
                <Typography
                  className="text-color"
                  size="10px"
                  weight={500}
                  lineHeight="20px"
                >
                  <span style={{ fontWeight: 'bold' }}>
                    {operator(
                      data?.collectionQualifiedLead?.totalLead,
                      data?.collectionQualifiedLead?.previousMonthTotalLead
                    )}
                  </span>{' '}
                  Dari bulan lalu
                </Typography>
              </FlexOneLink>
            </FlexBetween>
          </ContentWrapper>
        ) : (
          <ContentWrapper>
            <FlexBetween nopadding>
              <div style={{ flex: 'auto' }}>
                {data?.collectionSummary?.map((item) => {
                  return generateRowWithValue(
                    item?.totalOpportunity,
                    item?.opportunityStage
                  );
                })}
              </div>

              <WidgetOpportunity
                id="btn-link-row-widget}"
                variant="link"
                to={Checkpoints.opptyList}
                color="neutral70"
              >
                {data?.collectionRevenuePlan && (
                  <FlexView nogap>
                    <Typography
                      color="white"
                      size="3.2rem"
                      weight={700}
                      lineHeight={1.2}
                    >
                      {formatNumber(data?.collectionRevenuePlan)}
                    </Typography>
                    <Typography
                      color="white"
                      size="12px"
                      weight={400}
                      lineHeight={1.2}
                      style={{ alignSelf: 'flex-end', marginBottom: 5 }}
                    >
                      {formatValue(data?.collectionRevenuePlan) || ''}
                    </Typography>
                  </FlexView>
                )}
                <Typography
                  color="neutral30"
                  size="10px"
                  weight={400}
                  lineHeight={1}
                  align="center"
                >
                  Potensi Revenue Bulan Ini
                </Typography>
              </WidgetOpportunity>
              <Icon
                iconName="ChevronRight"
                size="20px"
                color="neutral40"
                style={{ alignItems: 'center' }}
              />
            </FlexBetween>
          </ContentWrapper>
        )}
        <div style={{ flex: 'auto', display: 'grid' }}>
          {text === 'Leads' && (
            <FlexView>
              <Typography
                color="neutral80"
                size="12px"
                weight={700}
                letterSpacing="0.2px"
              >
                {data?.collectionTotalConvertion || `0%`}
              </Typography>
              <Typography
                color="neutral70"
                size="10px"
                weight={500}
                letterSpacing="0.2px"
                elipsis
              >
                Qualified Leads berhasil Closed Converted
              </Typography>
            </FlexView>
          )}
          <Typography
            color="neutral70"
            size="10px"
            weight={500}
            letterSpacing="0.2px"
            style={{ alignSelf: 'flex-end' }}
          >
            *Data Diperbaharui pada{' '}
            {formatDate(data?.updatedAt, 'HH:mm DD-MM-YYYY')}
          </Typography>
        </div>
      </PaddingCardWrapper>
    </MediumCardWrapper>
  );
};

export default MediumCard;

MediumCard.defaultProps = {
  header: {
    icon: 'Agreement',
    position: 'left',
  },
  content: {
    amount: 0,
    text: 'Leads',
    subText: 'Total Incoming & Qualified Leads.',
  },
  type: 'type1',
  description: '*Data diperbaharui pada 09:15 12-01-2024.',
  data: {
    collectionSummary: [],
    collectionRevenuePlan: 0,
    collectionQualifiedLead: {},
    collectionIncomingLead: {},
    collectionTotalConvertion: '',
    updatedAt: '',
  },
  monthAndYear: moment().locale('id').format('MMMM YYYY'),
};

MediumCard.propTypes = {
  header: PropTypes.shape({
    icon: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right']),
  }),
  content: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    subText: PropTypes.string,
  }),
  type: PropTypes.oneOf(['type1', 'type2', 'type3']),
  description: PropTypes.string,
  data: PropTypes.shape({
    collectionRevenuePlan: PropTypes.number,
    collectionSummary: PropTypes.arrayOf(PropTypes.shape({})),
    collectionIncomingLead: PropTypes.shape({
      totalLead: PropTypes.number,
      previousMonthTotalLead: PropTypes.number,
    }),
    collectionQualifiedLead: PropTypes.shape({
      totalLead: PropTypes.number,
      previousMonthTotalLead: PropTypes.number,
    }),
    collectionTotalConvertion: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  monthAndYear: PropTypes.string,
};

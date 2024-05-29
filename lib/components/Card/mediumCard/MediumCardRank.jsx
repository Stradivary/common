import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  PaddingCardWrapper,
  MediumCardRankWrapper,
  FlexWrapper,
} from './styled';
import { Icon } from '../../Icon';
import { Typography } from '../../Typography';
import { ProgressBar } from '../../ProgressBar';

const formatNumber = (num) => {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(1)}T`;
  }
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}B`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1)}K`;
  }
  return num.toString();
};

const formatDate = (date, format = 'DD/MM/YYYY', specificFormat = '') => {
  moment.locale('id');
  if (!moment(date, specificFormat).isValid() || !date) {
    return undefined;
  }
  return `${moment(date, specificFormat).format(format)}`;
};

const MediumCardRank = (props) => {
  const {
    description,
    data,
    type,
    username,
    rankCategory,
    monthAndYear,
    ...rest
  } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MediumCardRankWrapper {...rest} type={type}>
      <PaddingCardWrapper>
        <Typography
          color="neutral30"
          size="10px"
          weight={500}
          lineHeight="20.5px"
        >
          Halo {username},
        </Typography>
        <Typography color="white" size="16px" weight={700} lineHeight="24px">
          {`Anda berada di peringkat ${data?.mtd?.rank} dari ${data?.mtd?.rankCategory} ${rankCategory} dibulan ${monthAndYear}.`}
        </Typography>
        <FlexWrapper>
          <Typography color="white" size="10px" weight={400} lineHeight="18px">
            MTD Achievement
          </Typography>
          {data && (
            <Typography
              color="white"
              size="10px"
              weight={400}
              lineHeight="18px"
            >
              <span style={{ fontSize: 12, fontWeight: 'bold' }}>
                {formatNumber(data?.mtd?.valueMom || 0)}
              </span>
              /{formatNumber(data?.mtd?.target || 0)}
            </Typography>
          )}
        </FlexWrapper>
        <ProgressBar
          withoutMargin
          percentage={
            ((data?.mtd?.valueMom || 0) / (data?.mtd?.target || 0)) * 100
          }
          size="small"
          width="100%"
        />
        <Typography color="white" size="10px" weight={400} lineHeight="18px">
          <Icon iconName="Increase" size="8px" color="#01AB08" />
          <span style={{ fontWeight: '500' }}>
            {' '}
            {data?.mtd?.percentageMom}%{' '}
          </span>
          {`Dari bulan lalu (${formatNumber(data?.lastMonth?.target || 0)})`}
        </Typography>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography color="white" size="10px" weight={400} lineHeight="18px">
            YTD Achievment
          </Typography>
          <Typography color="white" size="10px" weight={400} lineHeight="18px">
            <span style={{ fontSize: 12, fontWeight: 'bold' }}>
              {formatNumber(data?.ytd?.valueYoy || 0)}
            </span>
            /{formatNumber(data?.ytd?.target || 0)}
          </Typography>
        </div>
        <ProgressBar
          withoutMargin
          percentage={
            ((data?.ytd?.valueYoy || 0) / (data?.mtd?.target || 0)) * 100
          }
          size="small"
          width="100%"
        />
        <Typography color="white" size="10px" weight={400} lineHeight="18px">
          <Icon iconName="Increase" size="8px" color="#01AB08" />
          <span style={{ fontWeight: '500' }}>
            {' '}
            {data?.ytd?.percentageYoy}%{' '}
          </span>
          {`Dari tahun lalu (${formatNumber(data?.lastYear?.target || 0)})`}
        </Typography>
        <div style={{ flex: 'auto', display: 'grid' }}>
          <Typography
            color="white"
            size="10px"
            weight={500}
            letterSpacing="0.2px"
            style={{ alignSelf: 'flex-end' }}
          >
            Data Diperbarui pada{' '}
            {formatDate(data?.mtd?.updatedAt, 'HH:mm DD-MM-YYYY')}
          </Typography>
        </div>
      </PaddingCardWrapper>
    </MediumCardRankWrapper>
  );
};

export default MediumCardRank;

MediumCardRank.defaultProps = {
  header: {
    icon: 'Agreement',
    position: 'left',
  },
  content: {
    amount: 0,
    text: 'Leads',
    subText: `Total Incoming & Qualified Leads ${moment()
      .locale('id')
      .format('MMMM YYYY')}.`,
  },
  type: 'type1',
  description: '*Data diperbaharui pada 09:15 12-01-2024.',
  username: '',
  rankCategory: '',
  data: {
    name: 'TEST1',
    mtd: null,
    lastMonth: null,
    ytd: null,
    lastYear: null,
  },
  monthAndYear: moment().locale('id').format('MMMM YYYY'),
};

MediumCardRank.propTypes = {
  header: PropTypes.shape({
    icon: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right']),
  }),
  content: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    subText: PropTypes.string,
  }),
  data: PropTypes.any,
  type: PropTypes.oneOf(['type1', 'type2', 'type3']),
  description: PropTypes.string,
  username: PropTypes.string,
  rankCategory: PropTypes.string,
  monthAndYear: PropTypes.string,
};

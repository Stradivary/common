import React from 'react';
import PropTypes from 'prop-types';
import {
  KanbanWrapper,
  HeaderWarningWrapper,
  HeaderWrapper,
  ContentWrapper,
} from './styled';
import { Typography } from '../../Typography';
import { Icon } from '../../Icon';
import { Divider } from '../../Divider';
import { numberFormatter } from '../../../utils';

const KanbanCard = (props) => {
  const {
    idCard,
    isWarning,
    creationDate,
    dueDateStage,
    lastUpdate,
    title,
    title2,
    amount,
    description,
    step,
    onClick,
    ...rest
  } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <KanbanWrapper {...rest} isWarning={isWarning} onClick={onClick}>
      {isWarning && (
        <HeaderWarningWrapper>
          <Icon iconName="FilledBadgeError" />
          <Typography
            color="neutral5"
            weight={500}
            size="12px"
            letterSpacing="0.2px"
            wordBreak="break-word"
          >
            Tidak ada pembaruan sejak 1 bulan lalu.
          </Typography>
        </HeaderWarningWrapper>
      )}
      <HeaderWrapper>
        <Typography
          color="neutral50"
          size="10px"
          weight={500}
          letterSpacing="0.2px"
        >
          {idCard}
        </Typography>
        <Typography
          color="blue80"
          size="14px"
          weight={600}
          wordBreak="word-break"
          lineClamp={2}
        >
          {title}
        </Typography>

        {creationDate && (
          <Typography
            color="neutral50"
            size="11px"
            weight={500}
            letterSpacing="0.2px"
          >
            Creation Date <span>{creationDate}</span>
          </Typography>
        )}
        {dueDateStage && (
          <Typography
            color="neutral50"
            size="11px"
            weight={500}
            letterSpacing="0.2px"
          >
            Due Date Stage <span>{dueDateStage}</span>
          </Typography>
        )}

        {lastUpdate && (
          <Typography
            color="neutral50"
            size="11px"
            weight={500}
            letterSpacing="0.2px"
          >
            Update Terakhir <span>{lastUpdate}</span>
          </Typography>
        )}
      </HeaderWrapper>

      <Divider variant="middle-inset" />

      <ContentWrapper>
        <Typography color="primary" size="12px" weight={500}>
          {title2}
        </Typography>
        {description && (
          <Typography
            color="neutral70"
            size="10px"
            weight={500}
            letterSpacing="0.2px"
          >
            {description}
          </Typography>
        )}
        {step.map((el) => (
          <div key={el.id}>
            <Icon iconName={el.icon} />
            <Typography
              variant="body"
              color="blue80"
              size="10px"
              weight={500}
              letterSpacing="0.2px"
            >
              {el.text}
            </Typography>
          </div>
        ))}
        {amount && (
          <Typography color="blue80" size="12px" weight={600}>
            Rp {numberFormatter(amount)}
          </Typography>
        )}
      </ContentWrapper>
    </KanbanWrapper>
  );
};

export default KanbanCard;

KanbanCard.defaultProps = {
  idCard: undefined,
  isWarning: false,
  isMarginBottom: false,
  lastUpdate: undefined,
  dueDateStage: undefined,
  creationDate: undefined,
  title: undefined,
  title2: undefined,
  description: undefined,
  step: [
    {
      id: 1,
      icon: 'Agreement',
      text: 'FUT Readiness',
    },
  ],
  amount: undefined,
  onClick: () => {},
};

KanbanCard.propTypes = {
  idCard: PropTypes.string,
  isWarning: PropTypes.bool,
  isMarginBottom: PropTypes.bool,
  dueDateStage: PropTypes.string,
  creationDate: PropTypes.string,
  lastUpdate: PropTypes.string,
  title: PropTypes.string,
  title2: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  step: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};

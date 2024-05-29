import React from 'react';
import PropTypes from 'prop-types';
import {
  ListCardWrapper,
  HeaderWrapper,
  ContentWrapper,
  ContentInnerWrapper,
} from './styled';
import { Typography } from '../../Typography';
import { Icon } from '../../Icon';

const ListCard = (props) => {
  const {
    header: { title, description },
    content,
    ...rest
  } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ListCardWrapper {...rest}>
      <HeaderWrapper>
        <Typography
          variant="h1"
          color="blue80"
          weight={700}
          letterSpacing="0.4px"
          size="22px"
        >
          {title}
        </Typography>
        <Typography
          variant="body"
          color="neutral70"
          weight={400}
          size="14px"
          wordBreak="break-word"
        >
          {description}
        </Typography>
      </HeaderWrapper>

      <ContentWrapper>
        {content.map((el) => (
          <ContentInnerWrapper key={el.id}>
            <Typography variant="h2" color="blue80" size="12px" weight={700}>
              {el.title}
            </Typography>
            <div>
              <Typography
                variant="body"
                color="primary"
                size="42px"
                weight={700}
              >
                {el.totalTicket}
              </Typography>
              <div>
                <Typography>
                  <span>{el.open}</span>
                  Open
                </Typography>
                <Typography>
                  <span>{el.inProgress}</span>
                  In Progress
                </Typography>
              </div>
              <Icon
                iconName="ChevronUp"
                style={{ transform: 'rotate(90deg)' }}
              />
            </div>
          </ContentInnerWrapper>
        ))}
      </ContentWrapper>
    </ListCardWrapper>
  );
};

export default ListCard;

ListCard.defaultProps = {
  header: {
    title: 'Tiket',
    description: 'Daftar tiket yang harus diselesaikan',
  },
  content: [
    {
      id: 1,
      title: 'Dibuat Saya',
      totalTicket: 20,
      open: 10,
      inProgress: 10,
    },
    {
      id: 2,
      title: 'Ditugaskan',
      totalTicket: 25,
      open: 15,
      inProgress: 10,
    },
  ],
};

ListCard.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      totalTicket: PropTypes.number,
      open: PropTypes.number,
      inProgress: PropTypes.number,
    })
  ),
};

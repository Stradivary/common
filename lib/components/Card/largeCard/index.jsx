/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  LargeCardWrapper,
  HeaderWrapper,
  ContentWrapper,
  InnerContentWrapper,
  PaddingCardWrapper,
} from './styled';
import { Typography } from '../../Typography';

const LargeCard = (props) => {
  const { label, title, content, ...rest } = props;
  return (
    <LargeCardWrapper {...rest}>
      <PaddingCardWrapper>
        <HeaderWrapper>
          <Typography
            variant="label"
            color="neutral5"
            size="10px"
            lineHeight="150%"
            letterSpacing="0.2px"
          >
            {label}
          </Typography>
          <Typography
            variant="label"
            color="neutral5"
            size="16px"
            lineHeight="150%"
            weight={700}
          >
            {title}
          </Typography>
        </HeaderWrapper>

        <ContentWrapper>
          {content.map((el) => (
            <InnerContentWrapper key={el.id}>
              <Typography
                variant="h1"
                color="neutral5"
                size="40px"
                lineHeight="150%"
                weight={700}
              >
                #{el.rank}
              </Typography>
              <div>
                <Typography
                  variant="h4"
                  color="neutral5"
                  size="12px"
                  lineHeight="150%"
                  weight={400}
                >
                  {el.region}
                </Typography>
                <Typography
                  variant="h4"
                  color="neutral40"
                  size="8px"
                  weight={600}
                  lineHeight="150%"
                  letterSpacing="0.16px"
                >
                  {el.description}
                </Typography>
              </div>
            </InnerContentWrapper>
          ))}
        </ContentWrapper>

        <Typography
          size="9px"
          color="neutral5"
          margin="1rem 0 0 0"
          lineHeight="150%"
          weight={600}
          letterSpacing="0.16px"
        >
          Penilaian Berdasarkan jumlah Total Revenue Plan yang dibuat.
        </Typography>
      </PaddingCardWrapper>
    </LargeCardWrapper>
  );
};

LargeCard.defaultProps = {
  label: 'Halo Lukman,',
  title: 'Peringkat Anda bulan ini:',
  content: [
    {
      id: 1,
      rank: 129,
      region: 'Muara Teweh',
      description: 'dari total 224 AM',
    },
    {
      id: 2,
      rank: 130,
      region: 'Muara Teweh',
      description: 'dari total 224 AM',
    },
  ],
};

LargeCard.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default LargeCard;

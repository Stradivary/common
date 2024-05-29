/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import {
  StyledNotification,
  StyledData,
  StyledFlexContainer,
  StyledDate,
  StyledIconLeft,
  StyledIconRight,
  StyledLabel,
  StyledText,
  StyledTextLink,
  ParentContainer,
  HeaderContainer,
  StyledTextHeader,
  FooterContainer,
  TabContainer,
} from './styled';
import { Tabs } from '../Tab';

const IconMapping = (iconName, size) => {
  const mappings = {
    Warning: { icon: 'ExpiredNotif', color: 'blue80' },
    General: { icon: 'GeneralNotif', color: 'blue80' },
    Agreement: { icon: 'Ticket', color: 'blue80' },
    RedDots: { icon: 'RedDots', color: 'red' },
  };

  const { icon: mappedIconName, color } = mappings[iconName];

  const iconSize = size || (mappedIconName === 'RedDots' ? '4px' : '20px');

  return <Icon iconName={mappedIconName} size={iconSize} color={color} />;
};

export const Notification = ({ data, onClick, onReadAll, onCheckAll }) => {
  return (
    <ParentContainer>
      <HeaderContainer>
        <StyledTextHeader>
          <Typography
            variant="Label"
            size="1.6rem"
            lineHeight="150%"
            weight="700"
          >
            Notifikasi
          </Typography>
        </StyledTextHeader>
        <StyledTextHeader onClick={onReadAll}>
          <Typography
            variant="Label"
            size="1.2rem"
            lineHeight="150%"
            weight="400"
            color="#0055B6"
            style={{ textDecoration: 'underline', marginTop: '4px' }}
          >
            Tandai semua telah di baca
          </Typography>
        </StyledTextHeader>
      </HeaderContainer>
      <TabContainer>
        <Tabs
          tabs={{
            Semua: { text: 'Semua' },
            Tugas: { text: 'Tugas' },
            Monitoring: { text: 'Monitoring' },
            Lainnya: { text: 'Lainnya' },
          }}
          onSelect={() => {}}
        />
      </TabContainer>
      <StyledNotification>
        {data.map((notification, index) => {
          const formattedDate = moment(notification.date).format(
            'DD/MM/YYYY . HH:mm'
          );
          return (
            <StyledData key={index}>
              <StyledIconLeft type={notification.type}>
                {IconMapping(notification.type)}
              </StyledIconLeft>
              <StyledFlexContainer>
                <StyledText isRead={notification.isRead}>
                  <Typography
                    variant="Body"
                    size="1.2rem"
                    lineHeight="150%"
                    weight="400"
                  >
                    {notification.text}
                  </Typography>
                </StyledText>
                <StyledLabel>
                  <StyledDate>
                    <Typography
                      variant="Body"
                      size="1rem"
                      lineHeight="150%"
                      weight="400"
                    >
                      {formattedDate}
                    </Typography>
                  </StyledDate>
                  {notification.isRead ? null : (
                    // TODO: Click Based Data
                    <StyledTextLink onClick={() => onClick(index)}>
                      <Typography
                        variant="Body"
                        size="1rem"
                        lineHeight="150%"
                        weight="400"
                      >
                        Lihat Detail
                      </Typography>
                    </StyledTextLink>
                  )}
                </StyledLabel>
              </StyledFlexContainer>
              {notification.isRead ? (
                <StyledIconRight />
              ) : (
                <StyledIconRight>{IconMapping('RedDots')}</StyledIconRight>
              )}
            </StyledData>
          );
        })}
      </StyledNotification>
      <FooterContainer>
        <StyledTextHeader onClick={onCheckAll}>
          <Typography
            variant="Label"
            size="1.2rem"
            lineHeight="150%"
            weight="400"
            color="#0055B6"
            style={{ textDecoration: 'underline', marginTop: '4px' }}
          >
            Lihat Semua Notifikasi
          </Typography>
        </StyledTextHeader>
      </FooterContainer>
    </ParentContainer>
  );
};

Notification.defaultProps = {
  data: [],
  onClick: () => {},
  onReadAll: () => {},
  onCheckAll: () => {},
};

Notification.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
      date: PropTypes.string,
      isRead: PropTypes.bool,
    })
  ),
  onClick: PropTypes.func,
  onReadAll: PropTypes.func,
  onCheckAll: PropTypes.func,
};

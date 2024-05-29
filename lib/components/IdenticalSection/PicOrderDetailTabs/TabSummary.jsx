import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../Button';
import { Typography } from '../../Typography';
import { Checkpoints } from '../../../utils';
import { Container, Grid, TitleWrapper } from './style';

export const TabSummary = ({ data }) => {
  const showData = (label, value, type = 'text') => {
    return (
      <>
        <Typography
          id={`txt-${label}`}
          weight={500}
          size="1.4rem"
          lineHeight="2.1rem"
          color="blue80"
        >
          {label}
        </Typography>
        {type === 'text' && (
          <Typography
            id={`txt-${value}`}
            weight={400}
            size="1.4rem"
            lineHeight="2.1rem"
            color="neutral70"
          >
            {value}
          </Typography>
        )}
        {type === 'link' && (
          <Button
            id={`btn-${label?.replace(' ', '-').toLowerCase()}`}
            variant="link"
            color="neutral70"
            to={Checkpoints.projectDetails.replace(':id', value)}
          >
            <Typography
              weight={600}
              size="1.4rem"
              lineHeight="2.1rem"
              color="neutral70"
            >
              {value}
            </Typography>
          </Button>
        )}
      </>
    );
  };
  const {
    customerAccount: { project },
    orderId,
    createdAt,
    msisdn,
    address,
  } = data;
  const {
    projectName = '-',
    projectId = '',
    projectPic = [],
    contactType = '-',
  } = project ?? {};
  return (
    <Container id="pic-order-summary" gap="2.4rem">
      <TitleWrapper id="summary-title">
        <Typography
          id="txt-title"
          color="blue80"
          weight="bold"
          size="1.6rem"
          lineHeight="2.4rem"
        >
          Detail Order
        </Typography>
      </TitleWrapper>
      <Grid id="grid-summary" column={6} md={6} sm={6} xsm={12}>
        <Grid id="grid-column-1" column={6} md={6} sm={6} xsm={12}>
          {showData('ID Order', orderId)}
          {showData('Tanggal Order', createdAt)}
          {showData('Nama Project', projectName)}
          {showData(
            'ID Project',
            projectId,
            projectId === '-' ? 'text' : 'link'
          )}
        </Grid>
        <Grid id="grid-column-2" column={6} md={6} sm={6} xsm={12}>
          {showData('Nomor Telepon', msisdn)}
          {showData('Email', projectPic[0]?.email || '-')}
          {showData('Contact Type', contactType)}
          {showData('Alamat Pengiriman', address)}
        </Grid>
      </Grid>
    </Container>
  );
};
TabSummary.defaultProps = {
  data: {
    orderId: '-',
    createdAt: '-',
    customerAccount: {
      project: {
        projectName: '-',
        projectId: '-',
        contactType: '-',
        projectPic: [],
      },
    },
    msisdn: '-',
    address: '-',
  },
};
TabSummary.propTypes = {
  data: PropTypes.shape({
    orderId: PropTypes.string,
    createdAt: PropTypes.string,
    customerAccount: PropTypes.shape({
      project: PropTypes.shape({
        projectName: PropTypes.string,
        projectId: PropTypes.string,
        contactType: PropTypes.string,
        projectPic: PropTypes.arrayOf(
          PropTypes.shape({
            email: PropTypes.string,
          })
        ),
      }),
    }),
    msisdn: PropTypes.string,
    address: PropTypes.string,
  }),
};

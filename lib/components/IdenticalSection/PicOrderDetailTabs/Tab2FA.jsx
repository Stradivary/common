import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Accordion } from '../../Accordion';
import { Typography } from '../../Typography';
import { useGet2FA } from '../../../hooks/services';
import { Container, Grid } from './style';

const ACCORDION_ID_COMPANY = 'company';
const ACCORDION_ID_OTP1 = 'otp1';
const ACCORDION_ID_OTP2 = 'otp2';

export const Tab2FA = ({ data }) => {
  const [activeAccord, setActiveAccord] = useState([
    ACCORDION_ID_COMPANY,
    ACCORDION_ID_OTP1,
    ACCORDION_ID_OTP2,
  ]);

  const handleToggleAccordion = (accord) => {
    const index = activeAccord.indexOf(accord);
    let currentActive = activeAccord;
    if (index > -1) {
      const removedAccord = activeAccord.splice(index, 1)[0];
      const theRest = activeAccord.filter((item) => item !== removedAccord);
      currentActive = [...theRest];
      return setActiveAccord(currentActive);
    }
    currentActive = [accord, ...currentActive];
    return setActiveAccord(currentActive);
  };
  const showData = (label, value) => {
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
        <Typography
          id={`txt-${value}`}
          weight={400}
          size="1.4rem"
          lineHeight="2.1rem"
          color="neutral70"
          wordBreak="break-word"
        >
          {value}
        </Typography>
      </>
    );
  };

  const {
    customerAccount: { corporatePic, project },
  } = data || {};
  const { projectPic } = project || {};
  const corporatePicDetail = corporatePic[0];
  const projectPicDetail = projectPic[0];

  // TODO: need to change email parameter when login is done
  const { data: dataResponse } = useGet2FA(projectPicDetail.email);
  const twoFaDetail = get(dataResponse, 'data', {});
  const { idToken, profile } = twoFaDetail;
  return (
    <Container id="pic-order-2fa">
      <Accordion
        alwaysOpenOnDesktop
        id={ACCORDION_ID_COMPANY}
        onChange={handleToggleAccordion}
        title="Corporate"
        visible={activeAccord.includes(ACCORDION_ID_COMPANY)}
        borderTop={false}
        titleWeight={700}
        titleColor="blue80"
        titleColorActive="blue80"
      >
        <Container id="pic-order-2fa-company" gap="2.4rem">
          <Grid id="grid-company" column={6} md={6} sm={6} xsm={12}>
            <Grid id="grid-company-column-1" column={6} md={6} sm={6} xsm={12}>
              {showData('Contact ID', corporatePicDetail.corporatePicId)}
              {showData(
                'Nama Lengkap',
                `${corporatePicDetail.firstName} ${corporatePicDetail.lastName}`
              )}
              {showData('Posisi', corporatePicDetail.jobRole)}
            </Grid>
            <Grid id="grid-company-column-2" column={6} md={6} sm={6} xsm={12}>
              {showData(
                'Nomor Handphone',
                corporatePicDetail.primaryPhoneNumber
              )}
              {showData('Email', corporatePicDetail.email)}
            </Grid>
          </Grid>
        </Container>
      </Accordion>

      <Accordion
        alwaysOpenOnDesktop
        id={ACCORDION_ID_OTP1}
        onChange={handleToggleAccordion}
        title="Otentikasi Pertama"
        visible={activeAccord.includes(ACCORDION_ID_OTP1)}
        titleWeight={700}
        titleColor="blue80"
        titleColorActive="blue80"
      >
        <Grid
          id="grid-2fa-auth"
          column="6"
          md="12"
          sm="12"
          xsm="12"
          gap="2.4rem"
        >
          <Container id="pic-order-2fa-auth-1" gap="2.4rem">
            <Grid id="grid-2fa" column="6" md="6" sm="6" xsm="12">
              {showData('Nomor Handphone', projectPicDetail.primaryPhoneNumber)}
              {showData('Username', profile?.email || '-')}
            </Grid>
          </Container>
          <Container id="pic-order-2fa-auth-2" gap="2.4rem">
            <Typography
              id="txt-title"
              color="blue80"
              weight={700}
              size="1.4rem"
              lineHeight="2.4rem"
            >
              Otentikasi Kedua
            </Typography>
            <Grid id="grid-2fa" column="6" md="6" sm="6" xsm="12">
              {showData('Email atau MSISDN', profile?.email || '-')}
              {showData('Token', profile?.token || '-')}
              {showData('ID Token', idToken || '-')}
            </Grid>
          </Container>
        </Grid>
      </Accordion>
      <Accordion
        alwaysOpenOnDesktop
        id={ACCORDION_ID_OTP2}
        onChange={handleToggleAccordion}
        title="Otentikasi Kedua"
        visible={activeAccord.includes(ACCORDION_ID_OTP2)}
        titleWeight={700}
        titleColor="blue80"
        titleColorActive="blue80"
        className="otp2"
      >
        <Container id="pic-order-2fa-auth-2-mobile" gap="2.4rem">
          <Grid id="grid-2fa" column="6" md="6" sm="6" xsm="12">
            {showData('Email atau MSISDN', profile?.email || '-')}
            {showData('Token', profile?.token || '-')}
            {showData('ID Token', idToken || '-')}
          </Grid>
        </Container>
      </Accordion>
    </Container>
  );
};
Tab2FA.defaultProps = {
  data: {
    customerAccount: {
      corporatePic: [
        {
          corporatePicId: '-',
          firstName: '-',
          lastName: '',
          primaryPhoneNumber: '-',
          email: '-',
        },
      ],
      project: {
        projectPic: [
          {
            email: '-',
            primaryPhoneNumber: '-',
          },
        ],
      },
    },
  },
};
Tab2FA.propTypes = {
  data: PropTypes.shape({
    customerAccount: PropTypes.shape({
      corporatePic: PropTypes.arrayOf(
        PropTypes.shape({
          corporatePicId: PropTypes.string,
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          primaryPhoneNumber: PropTypes.string,
          email: PropTypes.string,
          jobRole: PropTypes.string,
        })
      ),
      project: PropTypes.shape({
        projectPic: PropTypes.arrayOf(
          PropTypes.shape({
            email: PropTypes.string,
            primaryPhoneNumber: PropTypes.string,
          })
        ),
      }),
    }),
  }),
};

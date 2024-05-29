import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex } from '../Flex';
import { Modal } from '../Modal';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { numberFormatter } from '../../utils';
import {
  WrapperHeaderModal,
  ContentWrapperModal,
  WrapperContentInner,
  ContentInner,
  Divider,
  Collapse,
  ContentCollapse,
  Ol,
  Li,
  CloseBtn,
} from './styled';

const bonusIcon = {
  data: 'FilledLanguage',
  sms: 'OutlinedMail',
  voice: 'OutlinedTelephone',
};

export const ModalOfferDetail = ({
  onCloseOfferDetail,
  isOpenOfferDetail,
  data,
}) => {
  const [showCollapse, setShowCollapse] = useState(false);
  const toggleCollapse = () => setShowCollapse((prevState) => !prevState);
  return (
    <Modal
      id={`modal-offer-detail-${data?.offerId}`}
      key={`modal-offer-detail-${data?.offerId}`}
      visible={isOpenOfferDetail}
      onClose={onCloseOfferDetail}
      width="120rem"
      showCloseBtn={false}
      padding="0"
    >
      <Flex width="100%" justify="center">
        <WrapperHeaderModal>
          <div>
            <Typography size="12px" weight={200} lineHeight="150%" color="#FFF">
              {data.offerId}
            </Typography>
            <Icon iconName="PriceQuoteLabel" size="2rem" />
          </div>
          <Typography
            size="22px"
            lineHeight="150%"
            weight={300}
            color="#FFF"
            wordBreak="break-word"
          >
            {data?.offerName}
          </Typography>
          <Typography
            size="25px"
            lineHeight="150%"
            weight={600}
            letterSpacing="0.4px"
            color="#FFF"
            margin="0.8rem 0 0 0"
          >
            Rp {numberFormatter(data?.listPrice)}
          </Typography>
          <CloseBtn id="btn-close-modal">
            <Icon
              onClick={onCloseOfferDetail}
              size="3.5rem"
              color="neutral5"
              iconName="Close"
            />
          </CloseBtn>
        </WrapperHeaderModal>

        <ContentWrapperModal>
          <WrapperContentInner>
            {data?.bonus?.map((el) => {
              const icon = bonusIcon?.[String(el?.class)?.toLowerCase()] || '';
              return (
                <ContentInner key={el.id} className="productCardContentInner">
                  <div>
                    {icon && <Icon iconName={icon} size="2.5rem" />}
                    <Typography
                      color="blue80"
                      size="14px"
                      weight={400}
                      lineHeight="150%"
                      style={{ wordBreak: 'break-all' }}
                    >
                      {el?.bonusName}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      color="blue80"
                      size="14px"
                      weight={500}
                      lineHeight="150%"
                    >
                      {el?.quota}
                    </Typography>
                  </div>
                </ContentInner>
              );
            })}
          </WrapperContentInner>
          <Divider />
          <Typography
            margin="6px 0"
            weight={500}
            size="14px"
            lineHeight="21px"
            color="blue80"
          >
            Package Description
          </Typography>
          <Typography
            margin="6px 0"
            size="14px"
            lineHeight="21px"
            color="neutral70"
          >
            {data?.shortDescription}
          </Typography>
          <Divider />
          <Collapse onClick={toggleCollapse}>
            <Typography size="14px" color="blue80" weight={500}>
              Syarat dan Ketentuan
            </Typography>
            <Icon
              iconName="ChevronDown"
              size="3rem"
              style={{
                transform: showCollapse ? 'rotate(-180deg)' : 'rotate(0)',
                transition: 'all 0.3s ease-in-out',
              }}
            />
          </Collapse>
          {showCollapse && (
            <ContentCollapse>
              <Ol>
                {Array.isArray(data?.termAndCondition) ? (
                  data?.termAndCondition?.map((term) => (
                    <Li key={term}>
                      <Typography
                        size="14px"
                        color="neutral70"
                        lineHeight="21px"
                      >
                        {term}
                      </Typography>
                    </Li>
                  ))
                ) : (
                  <Li>
                    <Typography size="14px" color="neutral70" lineHeight="21px">
                      {data?.termAndCondition}
                    </Typography>
                  </Li>
                )}
              </Ol>
            </ContentCollapse>
          )}
        </ContentWrapperModal>
      </Flex>
    </Modal>
  );
};

ModalOfferDetail.defaultProps = {
  onCloseOfferDetail: null,
  isOpenOfferDetail: false,
  data: {},
};
ModalOfferDetail.propTypes = {
  onCloseOfferDetail: PropTypes.func,
  isOpenOfferDetail: PropTypes.bool,
  data: PropTypes.shape({
    offerId: PropTypes.string,
    offerName: PropTypes.string,
    listPrice: PropTypes.string,
    bonus: PropTypes.array,
    shortDescription: PropTypes.string,
    termAndCondition: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  }),
};

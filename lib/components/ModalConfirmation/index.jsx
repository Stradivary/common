/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Flex } from '../Flex';
import { ActionButtonWrapper, ContentWrapper } from './styled';

export const ModalConfirmation = (props) => {
  const {
    id,
    visible,
    onClose,
    onSubmit,
    title,
    subtitle,
    btnSubmit,
    btnCancel,
    variant,
    multipleButton,
  } = props;

  const IconMapping = (type) => {
    const mappings = {
      Success: { icon: 'FilledSuccessConfirm' },
      Failed: { icon: 'FilledFailedConfirm' },
      Maintenance: { icon: 'FilledMaintenanceConfirm' },
      Requirement: { icon: 'FilledRequirementConfirm' },
    };

    const { icon: mappedIconName } = mappings[type];

    return <Icon iconName={mappedIconName} size="180px" />;
  };

  return (
    <Modal
      id={`modal-${id}`}
      key={`modal-${id}`}
      visible={visible}
      overflow="visible"
      maxHeight="80%"
      onClose={onClose}
    >
      <ContentWrapper>
        {IconMapping(variant)}
        <Typography
          id="txt-warning-title"
          color="blue80"
          weight={600}
          size="2rem"
          lineHeight="150%"
          align="center"
          margin="0 0 2px"
        >
          {title}
        </Typography>
        <Typography
          id="txt-warning-subtitle"
          color="neutral70"
          size="1.4rem"
          weight={400}
          lineHeight="2.1rem"
          align="center"
          margin="1.2rem 4rem 0 4rem"
        >
          {subtitle.split('\n').map((text, index) => (
            <React.Fragment key={index}>
              {text}
              <br />
            </React.Fragment>
          ))}
        </Typography>
        <ActionButtonWrapper>
          {multipleButton ? (
            <Flex direction="row" gap="spacing02" justify="space-around">
              <Flex
                size={{ dt: 'fit-content', mb: 12 }}
                gap="spacing04"
                justify="center"
              >
                <Button
                  id="btn-cancel-modal-confirmation"
                  className="responsive-button"
                  variant="outlined"
                  color="primary"
                  bgColor="primary"
                  onClick={onClose}
                >
                  {btnCancel}
                </Button>
                <Button
                  id="btn-submit-modal-confirmation"
                  className="responsive-button"
                  variant="contained"
                  bgColor="primary"
                  type="submit"
                  onClick={onSubmit}
                >
                  {btnSubmit}
                </Button>
              </Flex>
            </Flex>
          ) : (
            <Flex direction="column" gap="spacing05">
              <Button
                id="btn-submit-modal-confirmation"
                className="responsive-button"
                variant="contained"
                bgColor="primary"
                type="submit"
                onClick={onSubmit}
              >
                {btnSubmit}
              </Button>
            </Flex>
          )}
        </ActionButtonWrapper>
      </ContentWrapper>
    </Modal>
  );
};

ModalConfirmation.propTypes = {
  id: PropTypes.string,
  visible: PropTypes.bool,
  multipleButton: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  btnSubmit: PropTypes.string,
  btnCancel: PropTypes.string,
  variant: PropTypes.oneOf(['Success', 'Failed', 'Requirement', 'Maintenance']),
};

ModalConfirmation.defaultProps = {
  id: 'confirm',
  visible: false,
  multipleButton: false,
  onSubmit: () => {},
  onClose: () => {},
  title: '',
  subtitle: '',
  btnSubmit: 'Tamabahkan',
  btnCancel: 'Batal',
  variant: 'Success',
};

export default ModalConfirmation;

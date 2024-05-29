import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-modern-drawer';
import { screenSizes } from '../../styles/breakpoints';
import 'react-modern-drawer/dist/index.css';

import {
  DrawerContainer,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
} from './styled';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { TextField } from '../Textfield';

export const DrawerComponent = (props) => {
  const {
    open,
    direction,
    zIndex,
    onClose,
    id,
    size,
    children,
    handleSubmit,
    handleReset,
    isDisabled,
    hideBtn,
    chatMode,
    singleBtn,
    padding,
    style,
    className,
    title,
    buttonText,
    onSendNote,
    handleInputText,
    handleFileChange,
    handleUpload,
    buttonSend,
    chatText,
  } = props;

  const isMobileDevice = window.innerWidth < screenSizes.tp[1];

  const handleResetDrawer = (event) => {
    event.preventDefault();
    handleReset(event);
  };
  return (
    <Drawer
      open={open}
      direction={isMobileDevice ? 'bottom' : direction}
      zIndex={zIndex}
      onClose={onClose}
      customIdSuffix={id}
      size={isMobileDevice ? '100%' : size}
      style={style}
      className={className}
      enableOverlay
    >
      <DrawerContainer onSubmit={handleSubmit}>
        <div>
          <DrawerHeader padding={padding}>
            <Typography
              weight={700}
              size="26px"
              lineHeight="39px"
              color="blue80"
            >
              {title}
            </Typography>
            <button
              id={`btn-close-${id}`}
              onClick={onClose}
              type="button"
              aria-label="close"
              style={{ all: 'unset' }}
            >
              <Icon iconName="Cross" size="1.5rem" color="blue80" />
            </button>
          </DrawerHeader>
          <DrawerContent padding={padding}>{children}</DrawerContent>
        </div>
        {!hideBtn &&
          (singleBtn ? (
            <DrawerFooter>
              <Button
                id={`btn-drawer-submit-${id}`}
                padding="12px 24px"
                type="submit"
                disabled={isDisabled}
              >
                Tambahkan
              </Button>
            </DrawerFooter>
          ) : (
            <DrawerFooter>
              <Button
                id={`btn-drawer-reset-${id}`}
                variant="link"
                disabled={isDisabled}
                onClick={isDisabled ? () => {} : handleResetDrawer}
                type="button"
                size="large"
              >
                <Typography
                  size="12px"
                  weight={500}
                  textDecoration="underline"
                  lineHeight="18px"
                  color={isDisabled ? 'neutral50' : 'primary'}
                >
                  {buttonText.reset}
                </Typography>
              </Button>
              <Button
                id={`btn-drawer-submit-${id}`}
                padding="12px 24px"
                type="submit"
                disabled={isDisabled}
              >
                {buttonText.submit}
              </Button>
            </DrawerFooter>
          ))}

        {chatMode && (
          <DrawerFooter>
            <TextField
              id="input-chat-text"
              key="chat-text"
              name="chat-textfield"
              onChange={handleInputText}
              value={chatText}
              width="100%"
              placeholder="Masukan Text"
              startAdornment={
                <div>
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <Icon
                    iconName="OutlinedAttachFile"
                    size="2rem"
                    onClick={handleUpload}
                  />
                </div>
              }
            />
            <Icon
              iconName="FilledPapperPlane"
              size="32px"
              onClick={onSendNote}
              disabled={buttonSend}
            />
          </DrawerFooter>
        )}
      </DrawerContainer>
    </Drawer>
  );
};

DrawerComponent.defaultProps = {
  id: '',
  size: '',
  padding: '',
  className: '',
  open: false,
  isDisabled: false,
  hideBtn: false,
  chatMode: false,
  singleBtn: false,
  direction: 'right',
  zIndex: 99,
  style: {},
  title: 'Filter',
  buttonText: {
    reset: 'Reset',
    submit: 'Terapkan',
  },

  onClose: () => {}, // eslint-disable-line
  handleSubmit: () => {}, // eslint-disable-line
  handleReset: () => {}, // eslint-disable-line

  // mode chat
  onSendNote: () => {}, // eslint-disable-line
  handleUpload: () => {}, // eslint-disable-line
  handleFileChange: () => {}, // eslint-disable-line
  handleInputText: () => {}, // eslint-disable-line
  buttonSend: true,
  chatText: '',
};

DrawerComponent.propTypes = {
  id: PropTypes.string,
  padding: PropTypes.string,
  className: PropTypes.string,
  zIndex: PropTypes.number,
  open: PropTypes.bool,
  isDisabled: PropTypes.bool,
  hideBtn: PropTypes.bool,
  chatMode: PropTypes.bool,
  singleBtn: PropTypes.bool,
  title: PropTypes.string,
  buttonText: PropTypes.shape({
    reset: PropTypes.string,
    submit: PropTypes.string,
  }),

  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.shape({}),

  onClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,

  // mode chat
  onSendNote: PropTypes.func,
  handleUpload: PropTypes.func,
  handleFileChange: PropTypes.func,
  handleInputText: PropTypes.func,
  buttonSend: PropTypes.bool,
  chatText: PropTypes.string,
};

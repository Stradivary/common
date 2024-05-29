/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { Image } from '../Image';
import { Button } from '../Button';
import { Typography } from '../Typography';

import { StyledNoDataContent, StyledNoDataWrapper, Flex } from './styled';
import { EmptyDocument, SearchNotFoundImage } from '../../assets';

export const NoData = (props) => {
  const {
    image,
    bodyText,
    bodyTextWidth,
    headerText,
    addButton,
    isSearchNotFound,
  } = props;

  const generateBodyText = () => {
    if (typeof bodyText === 'string') {
      return (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          color="neutral70"
        >
          <Typography
            color="neutral70"
            size="1.2rem"
            lineHeight="150%"
            weight={400}
            align="center"
            style={{ width: bodyTextWidth }}
            id="txt-no-data-body"
          >
            {bodyText.split('\n').map((text, index) => (
              <React.Fragment key={`no-data-${index + 1}`}>
                {text}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Flex>
      );
    }
    return bodyText;
  };

  const generateNoDataImage = () => {
    const imageSrc = isSearchNotFound ? SearchNotFoundImage : EmptyDocument;
    const imageSize = isSearchNotFound
      ? { height: '100px', width: '100px', marginBottom: '16px' }
      : { height: '160px', width: '160px' };

    return <Image src={imageSrc} isLazy={false} style={imageSize} />;
  };

  return (
    <StyledNoDataWrapper>
      {image && generateNoDataImage()}

      <StyledNoDataContent>
        <Typography
          color="blue80"
          size="1.6rem"
          lineHeight="150%"
          weight={500}
          align="center"
          id="txt-no-data"
        >
          {headerText}
        </Typography>
        {generateBodyText()}
        {addButton && (
          <Button
            id={`btn-${addButton?.label?.split(' ')?.join('-')?.toLowerCase()}`}
            onClick={addButton.onClick}
            disabled={addButton.disabled}
            style={{ marginTop: '16px' }}
            startIcon="AddNew"
            color="neutral5"
          >
            <Typography
              size="1.4rem"
              lineHeight="150%"
              weight={400}
              margin="0 0 0 8px"
            >
              {addButton?.label}
            </Typography>
          </Button>
        )}
      </StyledNoDataContent>
    </StyledNoDataWrapper>
  );
};

NoData.defaultProps = {
  addButton: null,
  bodyTextWidth: '',
  isSearchNotFound: false,
};

NoData.propTypes = {
  image: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
  bodyText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  bodyTextWidth: PropTypes.string,
  addButton: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  }),
  isSearchNotFound: PropTypes.bool,
};

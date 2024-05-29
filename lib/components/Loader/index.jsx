import React from 'react';
import PropTypes from 'prop-types';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { LoaderComponent, Icon } from './styled';
import { LoaderGIF } from '../../assets';

export const Loader = (props) => {
  const { isLoading } = props;
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <LoaderComponent isLoading={isLoading || isMutating > 0 || isFetching > 0}>
      <Icon src={LoaderGIF} alt="Loading..." />
    </LoaderComponent>
  );
};

Loader.defaultProps = {
  isLoading: false,
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loader;

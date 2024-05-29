/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { Typography } from '../Typography';
import {
  ButtonStyled,
  Container,
  Ellipsis,
  FilterContainer,
  FilterContainerModal,
  FilterItem,
  IconWithMargin,
  ModalContainer,
  StyledDataFilter,
  StyledTypography,
} from './styled';

export const ListFilter = ({
  filters,
  onFilterRemove,
  onResetFilter,
  onHandleDownload,
}) => {
  const [visible, setVisible] = React.useState(false);

  const handleReset = () => {
    if (onResetFilter) {
      onResetFilter();
    }
  };

  const handleFilterRemove = (index) => {
    if (onFilterRemove) {
      onFilterRemove(index);
    }

    if (filters.length <= 4) {
      setVisible(false);
    }
  };

  const toggleModal = () => {
    setVisible(!visible);
  };

  const numRows = Math.ceil(filters.length / 4);
  const modalHeight = numRows * 48;

  return (
    <Container>
      <FilterContainer>
        {filters.slice(0, 4).map((filter, index) => (
          <FilterItem key={index}>
            <StyledDataFilter>{filter}</StyledDataFilter>
            <IconWithMargin onClick={() => handleFilterRemove(index)}>
              <Icon iconName="Cross" size="8px" />
            </IconWithMargin>
          </FilterItem>
        ))}
        {filters.length >= 4 && (
          <Ellipsis onClick={toggleModal}>
            <Icon iconName="ThreeDots" size="8px" />
          </Ellipsis>
        )}
        <ButtonStyled>
          <Button
            startIcon="Sorting"
            variant="outlined"
            size="medium"
            color="blue80"
          >
            <Typography
              variant="Poppins"
              size="1.2rem"
              weight={400}
              lineHeight="21px"
              color="blue80"
            >
              Mengurutkan
            </Typography>
          </Button>
          <Button
            startIcon="Filtering"
            variant="outlined"
            size="medium"
            color="blue80"
          >
            <Typography
              variant="Poppins"
              size="1.2rem"
              weight={400}
              lineHeight="21px"
              color="blue80"
            >
              Filter
            </Typography>
          </Button>
          {filters.length !== 0 && (
            <StyledTypography onClick={() => handleReset()}>
              <Typography
                variant="Poppins"
                size="1.4rem"
                weight={400}
                lineHeight="21px"
                color="blue80"
              >
                Reset Filter
              </Typography>
            </StyledTypography>
          )}
          <Button variant="outlined" size="medium" onClick={onHandleDownload}>
            <Icon iconName="Downloading" color="blue80" size="14px" />
          </Button>
        </ButtonStyled>
      </FilterContainer>
      {visible && (
        <ModalContainer visible={visible} style={{ height: modalHeight }}>
          <FilterContainerModal>
            {filters.map((filter, index) => (
              <FilterItem key={index}>
                {filter}
                <IconWithMargin onClick={() => handleFilterRemove(index)}>
                  <Icon iconName="Cross" size="8px" />
                </IconWithMargin>
              </FilterItem>
            ))}
          </FilterContainerModal>
        </ModalContainer>
      )}
    </Container>
  );
};

ListFilter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  onFilterRemove: PropTypes.func,
  onResetFilter: PropTypes.func,
  onHandleDownload: PropTypes.func,
};

ListFilter.defaultProps = {
  filters: [],
  onFilterRemove: () => {},
  onResetFilter: () => {},
  onHandleDownload: () => {},
};

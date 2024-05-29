/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import LargeCard from './largeCard/index';
import MediumCard from './mediumCard/MediumCard';
import MediumCardRank from './mediumCard/MediumCardRank';
import ProductCard from './productCard/ProductCard';
import ListCard from './listCard/ListCard';
import KanbanCard from './kanbanCard';

export const Card = (props) => {
  const { variant, ...rest } = props;
  switch (variant) {
    case 'large':
      return <LargeCard {...rest} />;
    case 'medium':
      return <MediumCard {...rest} />;
    case 'medium-rank':
      return <MediumCardRank {...rest} />;
    case 'list':
      return <ListCard {...rest} />;
    case 'product':
      return <ProductCard {...rest} />;
    case 'kanban':
      return <KanbanCard {...rest} />;
    default:
      return variant ? (
        <div>Variant card not found</div>
      ) : (
        <div>Variant card props is required</div>
      );
  }
};

Card.defaultProps = {
  variant: 'large',
  width: 'fit-content',
  height: 'fit-content',
  bgColor: '',
};

Card.propTypes = {
  variant: PropTypes.oneOf(['large', 'medium', 'list', 'product', 'kanban']),
  width: PropTypes.string,
  height: PropTypes.string,
  bgColor: PropTypes.string,
};

/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import {
  ChipItemWrapper,
  ChipIndicator,
  ChipsContainer,
  ChipIconWrapper,
} from './styled';

export const Chips = ({ data, variant, onDelete, onSelect }) => {
  const [selectedChips, setSelectedChips] = useState([]);

  useEffect(() => {
    if (typeof onSelect === 'function') onSelect(selectedChips);
  }, [selectedChips]);

  const handleSelectChip = (item) => () => {
    const isChipSelected = selectedChips.includes(item);

    setSelectedChips((prevSelectedChips) =>
      isChipSelected
        ? prevSelectedChips.filter((chip) => chip.id !== item.id)
        : [...prevSelectedChips, item]
    );
  };

  return (
    <ChipsContainer>
      {data.length > 0 &&
        data.map((item, index) => (
          <ChipItem
            key={`key-${item.id}-${index + 1}`}
            data={item}
            isSelected={selectedChips.includes(item)}
            onSelect={onSelect ? handleSelectChip(item) : undefined}
            onDelete={onDelete ? onDelete(item) : undefined}
            variant={variant}
          />
        ))}
    </ChipsContainer>
  );
};

const ChipItem = ({ data, variant, isSelected, onSelect, onDelete }) => {
  return (
    <ChipItemWrapper
      id={`btn-chips-${data.id}`}
      variant={variant}
      onClick={onSelect || undefined}
      isSelected={isSelected}
    >
      {data.indicator && <ChipIndicator />}
      <Typography
        weight={500}
        size="1.2rem"
        color="neutral70"
        lineHeight="1.8rem"
      >
        {data.label}
      </Typography>
      {data.closeButton && (
        <ChipIconWrapper onClick={onDelete} id="action-chips-delete">
          <Icon
            iconName="Close"
            size="12px"
            stroke="blue80"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          />
        </ChipIconWrapper>
      )}
    </ChipItemWrapper>
  );
};

Chips.defaultProps = {
  variant: 'filled',
  onDelete: null,
  onSelect: null,
};

Chips.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      indicator: PropTypes.bool,
      label: PropTypes.string, // Don’t use longer label chips than 20 characters and  make sure that the copywriting are less than 2 words.
      closeButton: PropTypes.bool,
    })
  ).isRequired,

  variant: PropTypes.oneOf(['text', 'filled']),
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

ChipItem.defaultProps = {
  variant: 'filled',
  data: {
    indicator: false,
    closeButton: false,
  },
  onDelete: null,
  onSelect: null,
};

ChipItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    indicator: PropTypes.bool,
    label: PropTypes.string.isRequired,
    closeButton: PropTypes.bool,
  }),
  isSelected: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(['text', 'filled']),

  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

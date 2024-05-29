import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Chips } from '../components';

const dataChipsFilled = [
  {
    id: 'chips-1',
    indicator: true,
    label: 'Chips-1',
    closeButton: true,
  },
  {
    id: 'chips-2',
    indicator: true,
    label: 'Chips-2',
    closeButton: true,
  },
  {
    id: 'chips-3',
    indicator: true,
    label: 'Chips-3',
    closeButton: false,
  },
];
const dataChipsText = [
  {
    id: 'chips-1',
    indicator: true,
    label: 'Chips-1',
    closeButton: true,
  },
  {
    id: 'chips-2',
    indicator: true,
    label: 'Chips-2',
    closeButton: true,
  },
  {
    id: 'chips-3',
    indicator: true,
    label: 'Chips-3',
    closeButton: false,
  },
];

const ChipsCosmos = (props) => {
  const { data, variant } = props;
  const [selectedChips, setSelectedChips] = useState([]);
  const [chipsData, setChipsData] = useState(data);

  const handleSelectChips = (chips) => {
    setSelectedChips(chips);
  };

  const handleDeleteChips = (chip) => () => {
    const updatedChips = chipsData.filter(
      (filtered) => filtered.id !== chip.id
    );
    setChipsData([...updatedChips]);
  };

  return (
    <>
      <Chips
        id="ListData"
        data={chipsData}
        onSelect={handleSelectChips}
        onDelete={handleDeleteChips}
        variant={variant}
      />
      <br />
      <p>Total Selected Chips: {selectedChips.length} </p>
    </>
  );
};

ChipsCosmos.propTypes = {
  variant: PropTypes.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      indicator: PropTypes.bool,
      label: PropTypes.string,
      variant: PropTypes.oneOf(['text', 'filled']),
      closeButton: PropTypes.bool,
    })
  ).isRequired,
};

export default {
  filled: () => <ChipsCosmos data={dataChipsFilled} variant="filled" />,
  text: () => <ChipsCosmos data={dataChipsText} variant="text" />,
};

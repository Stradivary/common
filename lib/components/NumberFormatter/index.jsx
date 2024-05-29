import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

/*  USE:
    props.value:
      a float/int, will be formatted for display
      (If props.value is missing or not a number, defaults to 0.)

    props.precision:
      an integer representing decimal precision - default 0

    props.abbreviate:
      boolean, will convert to three significant digits, plus 'k'/'m'/'b'

    props.delegateThousands:
      used to indicate NumberFormatter is being used by parent `NumberMoney`
      to generate the significant digits for balance/price expression.
      Truncates hundreds digits (and decimals).
      Overrides `props.precision` and `props.abbreviate`.

    props.className:
      just apply the className supplied by parent

    We've setup Indonesian localization for numeral,
    so it can output: "1.000.000,37" instead of "1,000,000.37"
    This happens in /utils/NumeralIndonesianSupport.js
    It responds to changes in state.userProfile.language

    REFS:
    Numeral docs at: http://numeraljs.com/
*/
const propTypes = {
  language: PropTypes.string.isRequired,
  abbreviate: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  precision: PropTypes.number,
  delegateThousands: PropTypes.bool,
  decimal: PropTypes.bool,
};

const defaultProps = {
  precision: 0,
  delegateThousands: false,
  decimal: false,
};

function returnOrdinalsEnglish(number) {
  const ones = number % 10;
  const isATeenth = Math.floor((number % 100) / 10) === 1;
  let suffix = '';
  if (isATeenth) {
    suffix = 'th';
  } else {
    switch (ones) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
    }
  }
  return suffix;
}

function initNumeralIndonesian() {
  numeral.language('in-id', {
    delimiters: {
      thousands: '.',
      decimal: ',',
    },
    abbreviations: {
      thousand: 'r', // 'ribu',
      million: 'j', // 'juta',
      billion: 'm', // 'miliar',
      trillion: 't', // 'triliun'
    },
    ordinal: returnOrdinalsEnglish, // needs own ordinals?
    currency: {
      symbol: 'Rp',
    },
  });
}

function initNumeralIndonesianEnglish() {
  numeral.language('in-en', {
    delimiters: {
      thousands: ',',
      decimal: '.',
    },
    abbreviations: {
      thousand: 'K',
      million: 'Mio',
      billion: 'Bio',
      trillion: 'T',
    },
    ordinal: returnOrdinalsEnglish,
    currency: {
      symbol: 'Rp',
    },
  });
}

function setNumeralLanguageIndonesian() {
  try {
    numeral.language('in-id');
  } catch (error) {
    // Indonesian support must be init-ed before it can be used!
    initNumeralIndonesian();
    numeral.language('in-id');
  }
}

function setNumeralLanguageEnglish() {
  // English support is provided by default, but we need some customization:
  try {
    numeral.language('in-en');
  } catch (error) {
    // Indonesian English support must be init-ed before it can be used!
    initNumeralIndonesianEnglish();
    numeral.language('in-en');
  }
}

export const NumberFormatter = (props) => {
  const { language, decimal, delegateThousands, value, precision, abbreviate } =
    props;
  let content = '';
  const chopThou = delegateThousands || false;
  const amount = Number.isNaN(Math.abs(value)) ? 0 : value;
  const precisionValue =
    Number.isNaN(Math.abs(precision)) || chopThou ? 0 : Math.abs(precision);
  const precisionFormatString =
    precisionValue > 0 ? `.${'0'.repeat(precisionValue)}` : '';
  const abbreviateFormatString = abbreviate === true ? ' a' : '';

  if (language === 'id') {
    setNumeralLanguageIndonesian();
  } else {
    setNumeralLanguageEnglish();
  }

  if (!chopThou && amount > 0) {
    // under normal circumstances, this is our output:
    let format = '0,0';
    if (decimal) {
      format = '0,0.00';
    }

    content = numeral(amount).format(
      format + precisionFormatString + abbreviateFormatString
    );
  } else if (chopThou && amount > 1000) {
    // ... but if delegateThousands is `true`, we want to truncate:
    // It would be nice to let the abbreviator do this for us,
    // but that won't work if value is millions.
    content = numeral(amount).format('0,0').slice(0, -4);
  } else if (chopThou && amount < 1000) {
    content = numeral(amount).format('0,0');
  } else {
    content = '0';
  }
  return <span>Rp {content}</span>;
};

NumberFormatter.propTypes = propTypes;
NumberFormatter.defaultProps = defaultProps;

export default NumberFormatter;

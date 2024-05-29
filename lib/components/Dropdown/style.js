import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const { colors, spacings, radius } = theme;

export const useElementSize = (ref) => {
  const [elementSize, setElementSize] = useState({
    widthElement: null,
    heightElement: null,
  });

  useEffect(() => {
    const updateElementSize = () => {
      if (ref?.current) {
        const { offsetWidth, offsetHeight } = ref?.current || {};
        setElementSize({
          widthElement: offsetWidth,
          heightElement: offsetHeight,
        });
      }
    };

    updateElementSize();

    window.addEventListener('resize', updateElementSize);

    return () => {
      window.removeEventListener('resize', updateElementSize);
    };
  }, [ref]);

  return elementSize;
};

export const BaseStyles = ({
  width,
  error,
  leftIcon,
  zIndex,
  variant,
  isOpen,
  widthElement,
  placeholderColor,
  borderColor,
}) => ({
  container: (defaultStyles) => ({
    ...defaultStyles,
    width,
    '& #aria-guidance': {
      display: 'none',
    },
    '[aria-live="polite"]': {
      display: 'none',
    },
  }),
  indicatorSeparator: (defaultStyles) => ({
    ...defaultStyles,
    display: 'none',
  }),
  control: (defaultStyles, state) => ({
    ...defaultStyles,
    minHeight: 40,
    borderColor: (() => {
      if (error) return colors.error;
      if (borderColor) return colors[borderColor];
      if (state.isFocused) return colors.primary;
      return colors.neutral50;
    })(),
    boxShadow: 'none',
    borderRadius: radius.small,
    flexDirection: leftIcon ? 'row-reverse' : 'row',
    cursor: 'pointer',
    fontSize: '1.4rem',
    fontFamily: 'Poppins',
    '@media only screen and (max-width: 768px)': {
      minHeight: 36,
    },
    '&:hover': {
      borderColor: variant === 'basic' && borderColor && colors.neutral90,
    },
    ...(isOpen &&
      variant !== 'basic' && {
        position: 'absolute',
        width: widthElement ? widthElement - 30 : '95%',
        left: 15,
        top: 16,
        zIndex: zIndex + 1,
      }),
  }),
  menu: (defaultStyles) => ({
    ...defaultStyles,
    border: `1px solid ${colors.neutral50}`,
    boxShadow: 'none',
    zIndex,
    borderRadius: radius.small,
    paddingBottom: spacings.spacing02,
    marginTop: variant === 'basic' ? 1 : 0,
    minWidth: variant === 'basic' && 'max-content',
    ...(variant !== 'basic' && { paddingTop: 60, top: 0 }),
  }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingBottom: spacings.spacing03,
    fontSize: '1.2rem',
  }),
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    display: 'flex',
    color: 'unset',
    backgroundColor: state.isSelected ? colors.blue5 : 'inherit',
    fontFamily: 'Poppins',
    padding: spacings.spacing04,
    '&:hover': {
      backgroundColor: colors.blue5,
      cursor: 'pointer',
    },
  }),
  menuPortal: ({ top, width: portalWidth, left, ...defaultStyles }) => {
    return {
      ...defaultStyles,
      top: top - 55,
      left: left - 15,
      width: portalWidth + 30,
      zIndex: zIndex || 'initial',
    };
  },
  valueContainer: (defaultStyles) => ({
    ...defaultStyles,
    ...(leftIcon && { paddingLeft: 0 }),
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    fontSize: '1.4rem',
    fontFamily: 'Poppins',
    color: placeholderColor ? colors[placeholderColor] : colors.neutral50,
    textWrap: 'nowrap',
  }),
  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    '@media only screen and (max-width: 768px)': {
      padding: 0,
      paddingRight: 12,
    },
  }),
});

export const ControlWrapper = styled.div(({ height }) => ({
  width: '100%',
  height,
}));

export const CheckboxLabel = styled.div(() => ({
  marginLeft: 5,
  display: 'flex',
  alignItems: 'center',
}));

export const Mark = (userInput) =>
  `<a style='color: ${colors.primary}'>${userInput}</a>`;

export const Checkbox = styled.input`
  height: 15px;
  width: 15px;
`;

export const DropdownWrapper = styled.div`
  width: ${({ width }) => width};
  position: relative;
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  bottom: -14px;
  left: 0;
`;

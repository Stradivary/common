/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import {
  ThreeDot,
  ContainerDropdown,
  DropdownItem,
  ContainerItems,
  ContainerText,
  IconContainer,
} from './style';

export const DropdownSimple = (props) => {
  const { option, onSelect, id, count, text, deg, icon, isBorder, isRight } =
    props;
  const [isShow, setIsShow] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (ref) {
      const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event?.target)) {
          setIsShow(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
    }
  }, [ref]);

  return (
    <ThreeDot
      id={id || 'btn-dropdown'}
      name="text-dropdown"
      onClick={() => setIsShow(!isShow)}
      ref={ref}
      isBorder={isBorder}
    >
      {text && (
        <ContainerText>
          <Typography
            id={`text-${text}`}
            size="1.4rem"
            color="blue80"
            lineHeight="21px"
          >
            {text}
          </Typography>
        </ContainerText>
      )}
      <IconContainer deg={deg}>
        <Icon
          iconName={icon || 'ThreeDots'}
          color="blue80"
          width="20"
          height="20"
        />
      </IconContainer>
      {isShow && option.length > 0 && (
        <ContainerDropdown
          id={`container-dropdown-${id}`}
          count={count}
          isRight={isRight}
        >
          <ContainerItems>
            {option.map((item, index) => (
              <DropdownItem
                id={`option-${index}-${id}`}
                key={`option-${item?.value}`}
                name="dropdown-page"
                onClick={() => onSelect(item)}
              >
                <Typography
                  id={`text-${
                    /* label could be component */
                    typeof item?.label === 'object'
                      ? index
                      : item?.label.toString()
                  }`}
                  size="1.4rem"
                  color="blue80"
                  lineHeight="21px"
                >
                  {/* label could be component */}
                  {typeof item?.label === 'object'
                    ? item?.label
                    : item?.label.toString()}
                </Typography>
              </DropdownItem>
            ))}
          </ContainerItems>
        </ContainerDropdown>
      )}
    </ThreeDot>
  );
};

DropdownSimple.defaultProps = {
  id: 'idDropdownSimple',
  option: [],
  onSelect: () => {},
  count: 5,
  text: null,
  deg: 0,
  icon: null,
  isBorder: false,
  isRight: true,
};

DropdownSimple.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  onSelect: PropTypes.func,
  count: PropTypes.number,
  deg: PropTypes.number,
  icon: PropTypes.string,
  isBorder: PropTypes.bool,
  isRight: PropTypes.bool,
  option: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

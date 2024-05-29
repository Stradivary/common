/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import {
  ParentContainer,
  IconContainer,
  LabelContainer,
  ListItemContainer,
  MenuContainer,
} from './styled';

export const MenuList = ({ data, width, onClick }) => {
  const [selectedMenu, setSelectedMenu] = React.useState(null);

  const handleMenuClick = (index) => {
    if (!data[index].disable) {
      setSelectedMenu(index);
      onClick(data[index]);
    }
  };

  const totalItems = data.length;

  return (
    <ParentContainer>
      {data.map((menu, index) => (
        <MenuContainer
          key={index}
          isFirst={index === 0}
          isLast={index === totalItems - 1}
          isSelected={selectedMenu === index}
          disable={menu.disable}
          onClick={() => handleMenuClick(index)}
          width={width}
        >
          <ListItemContainer>
            <IconContainer>
              <Icon
                iconName={
                  menu.disable
                    ? 'GreyGear'
                    : selectedMenu === index
                      ? 'WhiteGear'
                      : menu.iconName || 'Gear'
                }
                color={menu.disable ? '#ADADAD' : 'default'}
              />
            </IconContainer>
            <LabelContainer>
              <Typography
                variant="Body"
                size="1.2rem"
                lineHeight="150%"
                weight="400"
                color={
                  menu.disable
                    ? '#ADADAD'
                    : selectedMenu === index
                      ? 'white'
                      : '#333333'
                }
              >
                {menu.text}
              </Typography>
            </LabelContainer>
          </ListItemContainer>
        </MenuContainer>
      ))}
    </ParentContainer>
  );
};

MenuList.defaultProps = {
  data: [],
  onClick: () => {},
  width: '208px',
};

MenuList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.string,
      disable: PropTypes.bool,
    })
  ),
  onClick: PropTypes.func,
  width: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';
import {
  ProductCardWrapper,
  ContentWrapper,
  WrapperHeader,
  ContentInner,
} from './styled';
import { Button } from '../../Button/index';
import { ActionButton } from '../../ActionButton';
import { Icon } from '../../Icon/index';
import { Typography } from '../../Typography/index';
import { Tooltip } from '../../Tooltip';
import { numberFormatter } from '../../../utils';
import { Flex } from '../../Flex';

const ProductCard = (props) => {
  const {
    productId,
    iconHeader,
    title,
    price,
    content,
    isDisable,
    isSelected,
    buttonVariant,
    buttonIcon,
    buttonLabel,
    buttonOnClick,
    buttonAction,
    buttonActionOptions,
    labelCategory,
    showOnlyActionButton,
    endIconActionOption,
    isShowTooltip,
    tooltipPlacement,
    ...rest
  } = props;

  const colorButton = {
    color: isSelected ? 'error' : undefined,
    textColor: () => {
      if (isSelected) return 'error';
      return buttonVariant === 'contained' ? 'neutral5' : 'primary';
    },
  };

  const generateTooltipPosition = () => {
    if (tooltipPlacement === 'upper') {
      return {
        bottom: '130%',
        transform: 'translateX(-45%)',
      };
    }

    if (tooltipPlacement === 'left') {
      return {
        bottom: '-20%',
        transform: 'translateX(-12%)',
      };
    }

    return {};
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ProductCardWrapper className="productCardWrapper" {...rest}>
      <WrapperHeader className="productCardHeader" isDisable={isDisable}>
        <div>
          <Typography size="12px" weight={400} lineHeight="150%" color="#FFF">
            {productId}
          </Typography>
          {isShowTooltip && (
            <Tooltip
              placement={tooltipPlacement}
              withIcon={false}
              text="Harga produk dapat disesuaikan"
              position={generateTooltipPosition()}
            >
              <Icon iconName={iconHeader || 'Help'} />
            </Tooltip>
          )}
        </div>
        <Typography
          size="16px"
          lineHeight="150%"
          weight={700}
          color="#FFF"
          wordBreak="break-word"
        >
          {title}
        </Typography>
        <Typography
          size="20px"
          lineHeight="150%"
          weight={600}
          letterSpacing="0.4px"
          color="#FFF"
          margin="0.8rem 0 0 0"
        >
          Rp {numberFormatter(price)}
        </Typography>
      </WrapperHeader>

      <ContentWrapper className="productCardContent">
        {labelCategory && (
          <Flex justify="space-between" style={{ padding: '8px 16px' }}>
            <Typography
              weight={500}
              size="1rem"
              lineHeight="150%"
              color="neutral50"
            >
              {labelCategory}
            </Typography>
          </Flex>
        )}
        <Flex
          direction="column"
          flex="none"
          height="18rem"
          style={{ overflow: 'hidden auto' }}
          className="productCardContentContainer"
        >
          {content.map((el) => (
            <ContentInner key={el.id} className="productCardContentInner">
              <div>
                {el.icon && (
                  <Icon iconName={el.icon} size={el.iconSize || '2.5rem'} />
                )}
                <Typography
                  color="blue80"
                  size="14px"
                  weight={400}
                  lineHeight="150%"
                  style={{ wordBreak: 'break-all' }}
                >
                  {el.text}
                </Typography>
              </div>
              <div>
                <Typography
                  color="blue80"
                  size="28px"
                  weight={700}
                  lineHeight="150%"
                >
                  {el.benefit.value}
                </Typography>
                <Typography
                  color="blue80"
                  size="14px"
                  weight={500}
                  lineHeight="150%"
                >
                  {el.benefit.type}
                </Typography>
              </div>
            </ContentInner>
          ))}
          <ContentInner />
        </Flex>
        <Flex
          gap="spacing04"
          padding={['spacing05', 'spacing00', 'spacing05', 'spacing00']}
          direction="row"
          align="middle"
          justify="center"
        >
          {buttonAction && (
            <ActionButton
              id="btn-dropdown-option"
              startIcon={buttonLabel ? undefined : 'KebabMenuVertical'}
              endIcon={endIconActionOption}
              variant="dropdown"
              showIconOnly={!endIconActionOption}
              position="left"
              top="20"
              color="primary"
              options={buttonActionOptions}
              text={buttonLabel}
            />
          )}
          {!showOnlyActionButton && (
            <Button
              width={buttonAction ? '70%' : '90%'}
              variant={isSelected ? 'outlined' : buttonVariant}
              iconSize="2rem"
              startIcon={buttonIcon || undefined}
              disabled={isDisable}
              onClick={buttonOnClick || undefined}
              size="medium"
              color={colorButton.color}
              bgColor={colorButton.color}
            >
              <Typography
                margin="0 auto 0 0"
                size="14px"
                color={colorButton.textColor()}
                lineHeight="21px"
                weight={400}
              >
                {buttonLabel ||
                  `${isSelected ? 'Hapus dari' : 'Tambah ke'} Keranjang`}
              </Typography>
            </Button>
          )}
        </Flex>
      </ContentWrapper>
    </ProductCardWrapper>
  );
};

ProductCard.defaultProps = {
  productId: '00037425',
  iconHeader: 'Info',
  title: 'Internet All Network 10GB Free berlaku sesuai BC',
  price: 64000,
  isDisable: false,
  isSelected: false,
  buttonVariant: 'contained',
  content: [
    {
      id: 1,
      icon: 'Agreement',
      text: 'Internet',
      benefit: { value: 10, type: 'Gb' },
    },
    {
      id: 2,
      icon: 'SalesPlan',
      text: 'Voice All Operator',
      benefit: { value: 200, type: 'Menit' },
    },
    {
      id: 3,
      icon: 'CorporateInfo',
      text: 'SMS All Operator',
      benefit: { value: 1000, type: 'SMS' },
    },
  ],
  buttonIcon: null,
  buttonLabel: null,
  buttonOnClick: null,
  buttonAction: false,
  buttonActionOptions: [],
  labelCategory: null,
  showOnlyActionButton: false,
  endIconActionOption: '',
  isShowTooltip: true,
  tooltipPlacement: 'upper',
};

ProductCard.propTypes = {
  productId: PropTypes.string,
  iconHeader: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  isDisable: PropTypes.bool,
  isSelected: PropTypes.bool,
  buttonVariant: PropTypes.oneOf(['outlined', 'contained']),
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      icon: PropTypes.string,
      text: PropTypes.string,
      benefit: PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        type: PropTypes.string,
      }),
    })
  ),
  buttonIcon: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonOnClick: PropTypes.func,
  buttonAction: PropTypes.bool,
  buttonActionOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      iconName: PropTypes.string,
      iconSize: PropTypes.string,
      iconColor: PropTypes.string,
    })
  ),
  labelCategory: PropTypes.string,
  showOnlyActionButton: PropTypes.bool,
  endIconActionOption: PropTypes.string,
  isShowTooltip: PropTypes.bool,
  tooltipPlacement: PropTypes.string,
};

export default ProductCard;

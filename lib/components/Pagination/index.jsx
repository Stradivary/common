/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  PaginationChoose,
  PaginationChooseItem,
  ArrowContainer,
  ContainerPagination,
  ItemIndicator,
  ThreeDot,
  ItemIndicatorContainer,
  PaginationInput,
} from './style';

import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { DropdownSimple } from '../DropdownSimple';

export const Pagination = (props) => {
  const {
    id,
    page,
    totalData,
    limit,
    onSelectPage,
    onSelectLimit,
    indicatorItem,
    isShowCurrentPage,
    isShowTotalRow,
    indicatorType,
    optionLimit,
    position,
    isShowIndicator,
    paginationType,
    isShowPagination,
    language,
    textAfter,
    disabledNext,
  } = props;

  const totalPage = Math.ceil(totalData / limit) || 1;
  const [startPage, setStartpage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [optionStart, setOptionStart] = useState([]);
  const [optionEnd, setOptionEnd] = useState([]);
  const [optionAll, setOptionAll] = useState([]);

  const initStarter = () => {
    if (totalPage <= 6) {
      setStartpage(1);
      setEndPage(totalPage);
    } else if (page >= totalPage - 2 && page <= totalPage) {
      setEndPage(totalPage);
      setStartpage(totalPage - 4);
    } else if (totalPage >= 5 && page <= 2) {
      setStartpage(1);
      setEndPage(5);
    } else if (totalPage > 7 && page > 3) {
      setEndPage(page + 1);
      setStartpage(page - 1);
    } else {
      setEndPage(page + 2);
      setStartpage(page - 2);
    }
  };

  const initOption = () => {
    const allOption = [];
    const startOption = [];
    const endOption = [];

    for (let i = 1; i < totalPage + 1; i++) {
      allOption.push({ label: i.toString(), value: i.toString() });
      if (i >= 2 && i < startPage) {
        startOption.push({ label: i.toString(), value: i.toString() });
      }
      if (i >= endPage + 1 && i < totalPage) {
        endOption.push({ label: i.toString(), value: i.toString() });
      }
    }

    setOptionAll(allOption);
    setOptionStart(startOption);
    setOptionEnd(endOption);
  };

  useEffect(() => {
    initStarter();
  }, [page, limit, totalData]);

  useEffect(() => {
    initOption();
  }, [endPage, startPage, limit, totalData]);

  const generatePageList = () => {
    const dataPage = [];
    for (let i = startPage; i < endPage + 1; i++) {
      const numberPage = i;
      dataPage.push(
        <PaginationChooseItem
          id={`page-${i}-${id}`}
          key={i}
          isSelected={page === numberPage}
          onClick={() => {
            if (page !== numberPage) {
              onSelectPage(numberPage);
            }
          }}
        >
          <Typography size="1.4rem" color="blue80" lineHeight="21px">
            {numberPage}
          </Typography>
        </PaginationChooseItem>
      );
    }

    return dataPage;
  };

  const onPrev = () => {
    if (page > 1) {
      onSelectPage(page - 1);
    } else {
      // onSelectPage(1);
    }
  };

  const onNext = () => {
    if (totalPage > page) {
      onSelectPage(page + 1);
    } else {
      // onSelectPage(totalPage);
    }
  };

  const hanldeSelect = (item) => {
    onSelectPage(parseInt(item?.value, 10));
  };

  const hanldeSelectLimit = (item) => {
    onSelectLimit(parseInt(item?.value, 10));
  };

  const generateItemIndicator = () => {
    if (indicatorItem) {
      return indicatorItem;
    }

    if (indicatorType === 'input') {
      return (
        <ItemIndicatorContainer>
          {isShowCurrentPage && (
            <>
              <Typography size="1.4rem" color="blue80" lineHeight="21px">
                {language === 'en' ? 'Showing' : 'Menampilkan'}
              </Typography>
              <DropdownSimple
                id={`page-input-${id}`}
                option={optionLimit}
                icon="ChevronDown"
                onSelect={hanldeSelectLimit}
                isBorder
                text={limit.toString()}
              />
            </>
          )}
          {isShowCurrentPage && isShowTotalRow && (
            <Typography size="1.4rem" color="blue80" lineHeight="21px">
              {language === 'en' ? 'of' : 'dari'}
            </Typography>
          )}
          {isShowTotalRow && (
            <>
              <Typography
                size="1.4rem"
                color="blue80"
                lineHeight="21px"
                weight={600}
              >
                {totalData}
              </Typography>
              <Typography size="1.4rem" color="blue80" lineHeight="21px">
                {language === 'en' ? 'Rows' : 'Data'}
              </Typography>
            </>
          )}
          {textAfter && (
            <Typography size="1.4rem" color="blue80" lineHeight="21px">
              {textAfter}
            </Typography>
          )}
        </ItemIndicatorContainer>
      );
    }
    return (
      <ItemIndicatorContainer>
        {isShowCurrentPage && (
          <>
            <Typography size="1.4rem" color="blue80" lineHeight="21px">
              {language === 'en' ? 'Showing' : 'Menampilkan'}
            </Typography>
            <Typography
              text="text-limit"
              size="1.4rem"
              color="blue80"
              lineHeight="21px"
              weight={600}
            >
              {limit}
            </Typography>
          </>
        )}
        {isShowCurrentPage && isShowTotalRow && (
          <Typography size="1.4rem" color="blue80" lineHeight="21px">
            {language === 'en' ? 'of' : 'dari'}
          </Typography>
        )}
        {isShowTotalRow && (
          <>
            <Typography
              text="text-total-row"
              size="1.4rem"
              color="blue80"
              lineHeight="21px"
              weight={600}
            >
              {totalData}
            </Typography>
            <Typography size="1.4rem" color="blue80" lineHeight="21px">
              {language === 'en' ? 'Rows' : 'Data'}
            </Typography>
          </>
        )}
      </ItemIndicatorContainer>
    );
  };

  const generatePagination = () => {
    if (paginationType === 'inputSingle') {
      return (
        <PaginationChoose>
          <ArrowContainer onClick={onPrev} disabled={page === 1}>
            <Icon id={`action-back-${id}`} iconName="ArrowLeft" />
          </ArrowContainer>
          <PaginationChooseItem id="page-inputSingle" isSelected>
            <Typography size="1.4rem" color="blue80" lineHeight="21px">
              {page}
            </Typography>
          </PaginationChooseItem>
          <ArrowContainer
            onClick={() => !disabledNext && onSelectPage(page + 1)}
            disabled={disabledNext}
          >
            <Icon id={`action-next-${id}`} iconName="ArrowRight" />
          </ArrowContainer>
        </PaginationChoose>
      );
    }
    if (paginationType === 'input') {
      return (
        <PaginationInput>
          <Typography size="1.4rem" color="blue80" lineHeight="21px">
            Page
          </Typography>
          <DropdownSimple
            id={`input-page-${id}`}
            option={optionAll}
            icon="ChevronDown"
            onSelect={hanldeSelect}
            isBorder
            text={page.toString()}
          />
          <ArrowContainer onClick={onPrev} disabled={page === 1}>
            <Icon id={`action-back-${id}`} iconName="ArrowLeft" />
          </ArrowContainer>
          <ArrowContainer onClick={onNext} disabled={totalPage === page}>
            <Icon id={`action-next-${id}`} iconName="ArrowRight" />
          </ArrowContainer>
        </PaginationInput>
      );
    }

    if (paginationType === 'inputCenter') {
      return (
        <PaginationInput>
          <ArrowContainer onClick={onPrev} disabled={page === 1}>
            <Icon id={`action-back-${id}`} iconName="ArrowLeft" />
          </ArrowContainer>
          <DropdownSimple
            id={`input-page-${id}`}
            option={optionAll}
            icon="ChevronDown"
            onSelect={hanldeSelect}
            isBorder
            text={page.toString()}
          />
          <Typography size="1.4rem" color="blue80" lineHeight="21px">
            of {totalPage} Pages
          </Typography>
          <ArrowContainer onClick={onNext} disabled={totalPage === page}>
            <Icon id={`action-next-${id}`} iconName="ArrowRight" />
          </ArrowContainer>
        </PaginationInput>
      );
    }

    return (
      <PaginationChoose>
        <ArrowContainer onClick={onPrev} disabled={page === 1}>
          <Icon id={`action-back-${id}`} iconName="ArrowLeft" />
        </ArrowContainer>
        {startPage > 1 && totalPage > 6 && (
          <PaginationChooseItem onClick={() => onSelectPage(1)}>
            <Typography size="1.4rem" color="blue80" lineHeight="21px">
              1
            </Typography>
          </PaginationChooseItem>
        )}
        {startPage > 2 && (
          <ThreeDot>
            <DropdownSimple
              id={`btn-arrow-prev-${id}`}
              option={optionStart}
              onSelect={hanldeSelect}
            />
          </ThreeDot>
        )}
        {generatePageList()}
        {endPage < totalPage - 1 && (
          <ThreeDot>
            <DropdownSimple
              id={`btn-arrow-next-${id}`}
              option={optionEnd}
              onSelect={hanldeSelect}
            />
          </ThreeDot>
        )}
        {endPage < totalPage && totalPage > 6 && (
          <PaginationChooseItem onClick={() => onSelectPage(totalPage)}>
            <Typography size="1.4rem" color="blue80" lineHeight="21px">
              {totalPage}
            </Typography>
          </PaginationChooseItem>
        )}
        <ArrowContainer onClick={onNext} disabled={totalPage === page}>
          <Icon id={`action-next-${id}`} iconName="ArrowRight" />
        </ArrowContainer>
      </PaginationChoose>
    );
  };

  return (
    <ContainerPagination position={position}>
      {isShowIndicator && (
        <ItemIndicator>{generateItemIndicator()}</ItemIndicator>
      )}
      {isShowPagination && generatePagination()}
    </ContainerPagination>
  );
};

Pagination.defaultProps = {
  id: 'pagination',
  textAfter: '',
  page: 1,
  totalData: 0,
  limit: 10,
  optionLimit: [
    {
      label: '10',
      value: '10',
    },
    {
      label: '15',
      value: '15',
    },
    {
      label: '20',
      value: '20',
    },
    {
      label: '25',
      value: '25',
    },
  ],
  onSelectLimit: () => {},
  onSelectPage: () => {},
  indicatorItem: null,
  isShowIndicator: true,
  isShowTotalRow: true,
  disabledNext: false,
  isShowCurrentPage: true,
  indicatorType: 'default',
  isShowPagination: true,
  paginationType: 'default',
  position: 'space-between',
  language: 'id',
};

Pagination.propTypes = {
  id: PropTypes.string,
  textAfter: PropTypes.string,
  page: PropTypes.number,
  totalData: PropTypes.number,
  limit: PropTypes.number,
  optionLimit: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  onSelectLimit: PropTypes.func,
  onSelectPage: PropTypes.func,
  isShowIndicator: PropTypes.bool,
  disabledNext: PropTypes.bool,
  isShowCurrentPage: PropTypes.bool,
  isShowPagination: PropTypes.bool,
  isShowTotalRow: PropTypes.bool,
  paginationType: PropTypes.oneOf([
    'default',
    'input',
    'inputCenter',
    'inputSingle',
  ]),
  indicatorType: PropTypes.oneOf(['default', 'input']),
  position: PropTypes.oneOf(['space-between', 'center', 'flex-end']),
  indicatorItem: PropTypes.instanceOf(Element),
  language: PropTypes.oneOf(['id', 'en']),
};

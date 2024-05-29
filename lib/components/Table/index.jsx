import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Pagination } from '../Pagination';
import { NoData } from '../NoData';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import {
  ChipsWrapper,
  Container,
  StyledNoDataWithHeaderWrapper,
  StyledNoDataWrapper,
  StyledTable,
  TableWrapper,
} from './styled';
import { Chips } from '../Chips';
import { Button } from '../Button';
import { Typography } from '../Typography';

export const Table = (props) => {
  const {
    id,
    data,
    columns,
    isLoading,
    emptyDataState,
    pagination,
    freezeColumn,
    chips,
    showHeaderWhenNoData,
    handleSortTable,
  } = props;

  const [firstColumnWidth, setFirstColumnWidth] = useState(0);
  const [shouldFreezeColumn, setShouldFreezeColumn] = useState(freezeColumn);
  const [isScrollingX, setIsScrollingX] = useState(false);
  const tableRef = useRef(null);
  const wrapperRef = useRef(null);

  // Handle freeze 1st & 2nd column
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const { clientWidth, scrollWidth } = wrapperRef.current || {};

      // remove freeze column when mobile responsive
      if (viewportWidth <= 600 || !freezeColumn || clientWidth >= scrollWidth) {
        setShouldFreezeColumn(false);
        return;
      }

      // add condition to avoid null property query selector
      if (clientWidth < scrollWidth) {
        if (tableRef?.current) {
          const firstColHeader =
            tableRef.current.querySelector('th:first-child');
          if (firstColHeader) {
            setFirstColumnWidth(firstColHeader.offsetWidth);
          }
        }
      }

      setShouldFreezeColumn(clientWidth < scrollWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [wrapperRef.current, tableRef.current]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollX = wrapperRef.current.scrollLeft;
      if (scrollX > 0) setIsScrollingX(true);
      else setIsScrollingX(false);
    };

    handleScroll();
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [wrapperRef.current]);

  const generateNoData = () => {
    if (isEmpty(data)) {
      if (!isEmpty(chips) && chips?.data?.length > 0) {
        return (
          <StyledNoDataWrapper>
            <NoData
              image={emptyDataState?.image}
              headerText="Data Tidak Ditemukan"
              isSearchNotFound
              bodyText={
                <Typography
                  color="neutral70"
                  weight={400}
                  size="1.2rem"
                  align="center"
                  lineHeight="150%"
                  style={{
                    maxWidth: '400px',
                  }}
                >
                  Anda dapat melakukan{' '}
                  <span>
                    <Button
                      variant="link"
                      size="small"
                      color="blue80"
                      style={{
                        display: 'unset',
                        margin: '0 2px',
                        fontSize: '1.2rem',
                      }}
                      onClick={chips.reset}
                    >
                      reset
                    </Button>
                  </span>{' '}
                  atau sesuaikan ulang filter dengan menghapus pilihan yang
                  telah Anda terapkan sebelumnya.
                </Typography>
              }
              bodyTextWidth="550px"
            />
            <ChipsWrapper>
              <Chips id={id} data={chips.data} onDelete={chips.onDelete} />
            </ChipsWrapper>
          </StyledNoDataWrapper>
        );
      }
      if (showHeaderWhenNoData) {
        return (
          <StyledTable
            id={`table-${id}`}
            isDataEmpty={isEmpty(data)}
            ref={tableRef}
          >
            <TableHeader
              id={id}
              data={data}
              columns={columns}
              firstColumnWidth={firstColumnWidth}
              freezeColumn={shouldFreezeColumn}
              isScrollingX={isScrollingX}
              handleSortTable={handleSortTable}
            />
            <StyledNoDataWithHeaderWrapper>
              <NoData
                image={emptyDataState?.image}
                headerText={emptyDataState?.headerText}
                bodyText={emptyDataState?.bodyText}
                bodyTextWidth={emptyDataState?.bodyTextWidth}
                addButton={emptyDataState?.addButton}
              />
            </StyledNoDataWithHeaderWrapper>
          </StyledTable>
        );
      }

      return (
        <StyledNoDataWrapper>
          <NoData
            image={emptyDataState?.image}
            headerText={emptyDataState?.headerText}
            bodyText={emptyDataState?.bodyText}
            bodyTextWidth={emptyDataState?.bodyTextWidth}
            addButton={emptyDataState?.addButton}
          />
        </StyledNoDataWrapper>
      );
    }
    return null;
  };

  return (
    <Container>
      <TableWrapper ref={wrapperRef} className="table-wrapper">
        {(!isEmpty(data) ||
          (showHeaderWhenNoData && chips?.data?.length < 1)) && (
          <StyledTable
            id={`table-${id}`}
            isDataEmpty={isEmpty(data)}
            isLastColumnGrouped={
              columns.group &&
              columns.data[columns.data.length - 1].subCol.length > 0
            }
            ref={tableRef}
          >
            <TableHeader
              id={id}
              data={data}
              columns={columns}
              firstColumnWidth={firstColumnWidth}
              freezeColumn={shouldFreezeColumn}
              isScrollingX={isScrollingX}
              handleSortTable={handleSortTable}
            />
            <TableBody
              id={id}
              isLoading={isLoading}
              data={data}
              columns={columns}
              emptyDataState={emptyDataState}
              firstColumnWidth={firstColumnWidth}
              freezeColumn={shouldFreezeColumn}
              isScrollingX={isScrollingX}
            />
          </StyledTable>
        )}

        {generateNoData()}
      </TableWrapper>
      {!isEmpty(data) && pagination && !isLoading && (
        <Pagination
          id={id}
          page={pagination?.page}
          totalData={pagination?.totalData}
          onSelectPage={pagination?.onSelectPage}
          limit={pagination?.limit}
          onSelectLimit={pagination?.onSelectLimit}
          indicatorType={pagination?.indicatorType}
          indicatorItem={pagination?.indicatorItem}
          optionLimit={pagination?.optionLimit}
          paginationType={pagination?.paginationType}
          disabledNext={pagination?.disabledNext}
          isShowTotalRow={pagination?.isShowTotalRow}
          textAfter={pagination?.textAfter}
        />
      )}
    </Container>
  );
};

Table.defaultProps = {
  isLoading: false,
  data: [],
  columns: [],
  pagination: undefined,
  emptyDataState: undefined,
  freezeColumn: true,
  chips: null,
  showHeaderWhenNoData: false,
  handleSortTable: () => {},
};

Table.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.shape([])]),
  isLoading: PropTypes.bool,
  emptyDataState: PropTypes.shape({
    image: PropTypes.bool.isRequired,
    headerText: PropTypes.string.isRequired,
    bodyText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    bodyTextWidth: PropTypes.string,
    addButton: PropTypes.shape({}),
  }),
  pagination: PropTypes.shape({
    page: PropTypes.number || PropTypes.string,
    totalData: PropTypes.number || PropTypes.string,
    onSelectPage: PropTypes.func,
    paginationType: PropTypes.oneOf([
      'default',
      'input',
      'inputCenter',
      'inputSingle',
    ]),
    disabledNext: PropTypes.bool,
    textAfter: PropTypes.string,
    limit: PropTypes.number || PropTypes.string,
    onSelectLimit: PropTypes.func,
    indicatorType: PropTypes.oneOf(['default', 'input']),
    indicatorItem: PropTypes.string,
    isShowTotalRow: PropTypes.bool,
    optionLimit: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  }),
  freezeColumn: PropTypes.bool,
  chips: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    onDelete: PropTypes.func,
    reset: PropTypes.func,
  }),
  showHeaderWhenNoData: PropTypes.bool,
  handleSortTable: PropTypes.func,
};

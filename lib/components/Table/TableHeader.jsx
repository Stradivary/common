/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  StyledThGroup,
  StyledThTypeCheckbox,
  TooltipWrapper,
} from './styled';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Checkbox } from '../Checkbox';
import { typographyThSubtitleProps, typographyThTitleProps } from './constant';

const TableHeader = React.memo((props) => {
  const {
    id,
    columns,
    firstColumnWidth,
    freezeColumn,
    isScrollingX,
    handleSortTable,
  } = props;
  const { group } = columns;

  const handleSort = (column) => () => {
    handleSortTable(column);
  };

  return (
    <thead>
      {group ? (
        <GroupHeader
          id={id}
          columns={columns}
          firstColumnWidth={firstColumnWidth}
          freezeColumn={freezeColumn}
          isScrollingX={isScrollingX}
          handleSort={handleSort}
        />
      ) : (
        <SingleHeader
          id={id}
          columns={columns}
          firstColumnWidth={firstColumnWidth}
          freezeColumn={freezeColumn}
          isScrollingX={isScrollingX}
          handleSort={handleSort}
        />
      )}
    </thead>
  );
});

const generateFilledSortIcon = (sortOrder, direction) => {
  const lowerCaseSortOrder = sortOrder?.toLowerCase();
  let color = 'neutral70'; // Default color

  const ascending =
    lowerCaseSortOrder === 'ascending' || lowerCaseSortOrder === 'asc';

  const descending =
    lowerCaseSortOrder === 'descending' || lowerCaseSortOrder === 'desc';

  if (ascending && direction === 'up') {
    color = 'neutral5';
  } else if (descending && direction === 'down') {
    color = 'neutral5';
  }

  return color;
};

const generateSortIcon = (column) => (
  <Flex
    flexDirection="column"
    gap="2px"
    justifyContent="center"
    alignItems="center"
  >
    <Icon
      iconName="FilledSortArrowUp"
      color={generateFilledSortIcon(
        column?.sortOrder ?? column?.sort_order,
        'up'
      )}
      width="7.5px"
      height="5px"
    />
    <Icon
      iconName="FilledSortArrowDown"
      color={generateFilledSortIcon(
        column?.sortOrder ?? column?.sort_order,
        'down'
      )}
      width="7.5px"
      height="5px"
    />
  </Flex>
);

const generateColTypeSort = (column, id, handleSort, isSubCol) => (
  <Flex
    id={`${id}-sort-${column?.label?.replace(' ', '-').toLowerCase()}`}
    alignItems="center"
    gap="spacing02"
    onClick={handleSort(column)}
    cursor="pointer"
    justifyContent={column.justifyContent}
    margin={column.margin}
    style={column.style}
  >
    {isSubCol ? (
      <Typography
        {...typographyThSubtitleProps}
        color={column.color || 'neutral40'}
        weight={column.fontWeight || 500}
        align={column.textAlign || 'center'}
      >
        {column.label}
      </Typography>
    ) : (
      <Typography
        {...typographyThTitleProps}
        align={column.textAlign || 'left'}
        color={column.color || 'neutral5'}
        variant={column.variant || 'body'}
        style={{ ...column.textStyle }}
      >
        {column.label}
      </Typography>
    )}
    {generateSortIcon(column)}
  </Flex>
);

const generateColTypeTooltip = (column, isSubCol) => (
  <Flex alignItems="center" gap="spacing02">
    {isSubCol ? (
      <Typography
        {...typographyThSubtitleProps}
        color={column.color || 'neutral40'}
        weight={column.fontWeight || 500}
        align={column.textAlign || 'center'}
      >
        {column.label}
      </Typography>
    ) : (
      <Typography
        {...typographyThTitleProps}
        align={column.textAlign || 'left'}
        color={column.color || 'neutral5'}
        variant={column.variant || 'body'}
        style={{ ...column.textStyle }}
      >
        {column.label}
      </Typography>
    )}
    <TooltipWrapper>
      <Tooltip
        placement="bottom"
        withIcon={false}
        title=""
        {...column.tooltipProps}
      >
        <Icon iconName="SideMenuHelp" color="neutral5" size="10px" />
      </Tooltip>
    </TooltipWrapper>
  </Flex>
);

const generateColTypeSortWithTooltip = (column, id, handleSort, isSubCol) => (
  <Flex
    id={`${id}-sort-${column?.label?.replace(' ', '-').toLowerCase()}`}
    alignItems="center"
    gap="spacing02"
    onClick={handleSort(column)}
    cursor="pointer"
  >
    {isSubCol ? (
      <Typography
        {...typographyThSubtitleProps}
        color={column.color || 'neutral40'}
        weight={column.fontWeight || 500}
        align={column.textAlign || 'center'}
      >
        {column.label}
      </Typography>
    ) : (
      <Typography
        {...typographyThTitleProps}
        align={column.textAlign || 'left'}
        color={column.color || 'neutral5'}
        variant={column.variant || 'body'}
        style={{ ...column.textStyle }}
      >
        {column.label}
      </Typography>
    )}
    <TooltipWrapper>
      <Tooltip
        placement="bottom"
        withIcon={false}
        position={{
          top: 'calc(100% + 4px)',
        }}
        {...column.tooltipProps}
      >
        <Icon iconName="SideMenuHelp" color="neutral5" size="10px" />
      </Tooltip>
    </TooltipWrapper>
    {generateSortIcon(column)}
  </Flex>
);

const generateColTypeSubtitle = (column, isSubCol) => (
  <Flex flexDirection="column" gap="spacing02">
    {isSubCol ? (
      <Typography
        {...typographyThSubtitleProps}
        color={column.color || 'neutral40'}
        weight={column.fontWeight || 500}
        align={column.textAlign || 'center'}
      >
        {column.title}
      </Typography>
    ) : (
      <Typography
        {...typographyThTitleProps}
        align={column.textAlign || 'left'}
        color={column.color || 'neutral5'}
        variant={column.variant || 'body'}
        style={{ ...column.textStyle }}
      >
        {column.title}
      </Typography>
    )}
    <Typography
      {...typographyThSubtitleProps}
      align={column.textAlign || 'left'}
      variant={column.variant || 'body'}
      style={{ ...column.textSubtitleStyle }}
    >
      {column.subtitle}
    </Typography>
  </Flex>
);

const generateColTypeSubtitleWithSort = (column, id, handleSort, isSubCol) => (
  <Flex
    flexDirection="column"
    gap="spacing02"
    id={`${id}-sort-${column?.title?.replace(' ', '-').toLowerCase()}`}
    onClick={handleSort(column)}
    cursor="pointer"
  >
    <Flex gap="spacing02">
      {isSubCol ? (
        <Typography
          {...typographyThSubtitleProps}
          color={column.color || 'neutral40'}
          weight={column.fontWeight || 500}
          align={column.textAlign || 'center'}
        >
          {column.title}
        </Typography>
      ) : (
        <Typography
          {...typographyThTitleProps}
          align={column.textAlign || 'left'}
          color={column.color || 'neutral5'}
          variant={column.variant || 'body'}
          style={{ ...column.textStyle }}
        >
          {column.title}
        </Typography>
      )}
      {generateSortIcon(column)}
    </Flex>
    <Typography
      {...typographyThSubtitleProps}
      align={column.textAlign || 'left'}
      variant={column.variant || 'body'}
      style={{ ...column.textSubtitleStyle }}
    >
      {column.subtitle}
    </Typography>
  </Flex>
);

const generateColTypeCheckbox = (column) => (
  <StyledThTypeCheckbox>
    <Checkbox
      option={[{ id: '1', value: '' }]}
      withLabel={false}
      handleChange={column.handler}
      checkedValue={column.checked}
    />
  </StyledThTypeCheckbox>
);

const generateColTypeDefault = (column, isSubCol) =>
  isSubCol ? (
    <Typography
      {...typographyThSubtitleProps}
      color={column.color || 'neutral40'}
      weight={column.fontWeight || 500}
      align={column.textAlign || 'center'}
    >
      {column.label}
    </Typography>
  ) : (
    <Typography
      {...typographyThTitleProps}
      align={column.textAlign || 'left'}
      color={column.color || 'neutral5'}
      variant={column.variant || 'body'}
      style={{ ...column.textStyle }}
    >
      {column.label}
    </Typography>
  );

const generateColumnType = (column, id, handleSort, isSubCol = false) => {
  switch (column.type) {
    case 'sort':
      return generateColTypeSort(column, id, handleSort, isSubCol);
    case 'tooltip':
      return generateColTypeTooltip(column, isSubCol);
    case 'sortWithTooltip':
      return generateColTypeSortWithTooltip(column, id, handleSort, isSubCol);
    case 'subtitle':
      return generateColTypeSubtitle(column, isSubCol);
    case 'subtitleWithSort':
      return generateColTypeSubtitleWithSort(column, id, handleSort, isSubCol);
    case 'checkbox':
      return generateColTypeCheckbox(column);
    default:
      return generateColTypeDefault(column, isSubCol);
  }
};

const GroupHeader = (props) => {
  const {
    id,
    columns,
    firstColumnWidth,
    freezeColumn,
    isScrollingX,
    handleSort,
  } = props;
  const { data: columnData } = columns;

  const generateGroupColumn = (column, colIndex) => {
    const thGroupKey = `table-${id}-header-col${colIndex + 1}`;
    const thStyle = {
      whiteSpace: 'nowrap',
      width: column.width,
      verticalAlign: column.type === 'checkbox' ? 'middle' : 'baseline',
      ...column.thStyle,
    };

    if ((colIndex === 0 || colIndex === 1) && freezeColumn) {
      thStyle.position = 'sticky';
      thStyle.zIndex = 2;
      thStyle.left = colIndex === 0 ? '0' : `${firstColumnWidth}px`;

      if (isScrollingX) {
        thStyle.filter =
          colIndex === 1
            ? 'drop-shadow(20px 10px 10px rgba(0, 0, 0, 0.1))'
            : '';
      }
    }

    if (column.subCol.length > 0) {
      return (
        <StyledThGroup
          key={`subCol${thGroupKey}`}
          colSpan={`${column.subCol.length}`}
          countColSpan={100}
          paddingBottom="4px"
          style={thStyle}
        >
          {generateColumnType(column, id, handleSort)}
        </StyledThGroup>
      );
    }

    return (
      <th key={thGroupKey} rowSpan="2" style={thStyle}>
        {generateColumnType(column, id, handleSort)}
      </th>
    );
  };

  const generateGroupSubColumn = (subColumn, subColId) => {
    const thStyle = {
      width: subColumn.width,
      ...subColumn.thStyle,
    };

    return (
      <StyledThGroup
        key={`table-${id}-header-sub-col${subColId + 1}`}
        width={subColumn.width}
        paddingBottom="12px"
        paddingTop="0px"
        style={thStyle}
      >
        {generateColumnType(subColumn, id, handleSort, true)}
      </StyledThGroup>
    );
  };

  const generateGroupHeader = () => {
    const headerContent = [];
    const subColumns = [];

    columnData.forEach((column) =>
      column.subCol.map((subColumn) => subColumns.push(subColumn))
    );

    headerContent.push(
      <tr key={`table-${id}-header-tr1`}>
        {columnData.map((column, colIndex) =>
          generateGroupColumn(column, colIndex)
        )}
      </tr>
    );

    headerContent.push(
      <tr key={`table-${id}-header-tr2`}>
        {subColumns.map((subColumn, subColId) =>
          generateGroupSubColumn(subColumn, subColId)
        )}
      </tr>
    );

    return headerContent;
  };

  return generateGroupHeader();
};

const SingleHeader = (props) => {
  const {
    id,
    columns,
    firstColumnWidth,
    freezeColumn,
    isScrollingX,
    handleSort,
  } = props;

  const generateSingleColumn = (column, colId) => {
    const thKey = `table-${id}-header-col${colId + 1}`;
    const thStyle = {
      whiteSpace: 'nowrap',
      minWidth: column.width,
      verticalAlign: 'baseline',
      ...column.thStyle,
    };

    if ((colId === 0 || colId === 1) && freezeColumn) {
      thStyle.position = 'sticky';
      thStyle.zIndex = 2;
      thStyle.left = colId === 0 ? '0' : `${firstColumnWidth}px`;

      if (isScrollingX) {
        thStyle.filter =
          colId === 1 ? 'drop-shadow(20px 10px 10px rgba(0, 0, 0, 0.1))' : '';
      }
    }

    if (typeof column === 'object') {
      return (
        <th key={thKey} style={thStyle}>
          {generateColumnType(column, id, handleSort)}
        </th>
      );
    }

    return (
      <th key={thKey} style={thStyle}>
        <Typography
          {...typographyThTitleProps}
          align={column.textAlign || 'left'}
        >
          {column}
        </Typography>
      </th>
    );
  };

  return [
    <tr key={`key-table-${id}-header-tr1`}>
      {columns.map((column, colId) => generateSingleColumn(column, colId))}
    </tr>,
  ];
};

TableHeader.defaultProps = {
  columns: [],
  firstColumnWidth: null,
  isScrollingX: false,
  handleSortTable: () => {},
};

TableHeader.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
  firstColumnWidth: PropTypes.number,
  freezeColumn: PropTypes.bool.isRequired,
  isScrollingX: PropTypes.bool,
  handleSortTable: PropTypes.func,
};

export default TableHeader;

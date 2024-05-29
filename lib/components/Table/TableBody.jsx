/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { isEmpty } from 'lodash';
import {
  Flex,
  Link,
  // LoaderWrapper,
  StyledActionsDropdown,
  StyledActionsDropdownWrapper,
  StyledTd,
  StyledTdTypeCheckbox,
  StyledTdTypeLink,
  StyledTdTypeRadioButton,
  Sublink,
  TagWrapper,
  TooltipWrapper,
} from './styled';

import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Lozenge } from '../Lozenge';
import { RadioButton } from '../RadioButton';
import { Checkbox } from '../Checkbox';
import {
  actionIconMap,
  multipleActionIconMap,
  typographyTdSubtitleProps,
  typographyTdTitleProps,
} from './constant';
// import { Image } from '../Image';
// import { LoaderGIF } from '../../assets';

const TableBody = (props) => {
  const {
    id,
    data,
    // isLoading,
    // columns,
    firstColumnWidth,
    freezeColumn,
    isScrollingX,
  } = props;
  const [isOpenActions, setIsOpenActions] = useState({});
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  const dropdownRef = useRef(null);

  const handleClickDropdown = (rowIndex) => (event) => {
    const tdRect = event.currentTarget.getBoundingClientRect();

    setDropdownPosition({
      top: tdRect.top + window.scrollY,
      right: window.innerWidth - tdRect.left + window.scrollX,
    });
    setIsOpenActions((prevIsOpenActions) =>
      prevIsOpenActions === rowIndex ? null : rowIndex
    );
  };

  const handleClickItemMultipleAction = (handler, row) => (event) => {
    event.stopPropagation();

    if (handler) {
      handler(row);
      setIsOpenActions(null);
    }
  };

  const handleClickAction = (handler, row) => () => {
    handler(row);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpenActions(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsOpenActions(null);
    };

    const mainHeaderShell = document.querySelector(
      '[class^="MainHeader-shell"]'
    );

    if (mainHeaderShell) {
      mainHeaderShell.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainHeaderShell) {
        mainHeaderShell.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // type 'html' used for custom td type
  const generateColTypeHTML = (column, tdKey, tdStyle, rowIndex) => {
    const renderCellValue = () => {
      const cellValue = column.value;
      if (!cellValue || cellValue === '-' || cellValue === undefined) {
        return <Typography>-</Typography>;
      }

      return (
        <TooltipWrapper>
          <Tooltip
            placement={rowIndex === 0 ? 'right' : 'upper'}
            withIcon={false}
            text={cellValue}
          >
            {cellValue}
          </Tooltip>
        </TooltipWrapper>
      );
    };

    const onClickHandler = column.handler;

    return (
      <td
        id="cell"
        key={tdKey}
        onClick={onClickHandler}
        style={tdStyle || column?.tdStyle}
      >
        {renderCellValue()}
      </td>
    );
  };

  // type 'link' used for go to detail/other page
  const generateColTypeLink = (
    column,
    tdKey,
    tdStyle,
    textStyle,
    rowIndex,
    columnIndex
  ) => {
    const renderLinkElement = () => {
      const linkValue = column.value;
      if (!linkValue || linkValue === '-' || linkValue === undefined) {
        return <Typography>-</Typography>;
      }
      return (
        <TooltipWrapper>
          <Tooltip
            placement={rowIndex === 0 ? 'right' : 'upper'}
            withIcon={false}
            text={column.value}
          >
            <Link
              id={`btn-link-row-${rowIndex + 1}-col-${columnIndex + 1}`}
              variant="link"
              to={column?.to}
              onClick={column?.handler}
              color="neutral70"
            >
              <Typography
                {...typographyTdTitleProps}
                style={{
                  ...textStyle,
                  ...column?.textStyle,
                }}
              >
                {linkValue}
              </Typography>
            </Link>
          </Tooltip>
        </TooltipWrapper>
      );
    };

    return (
      <StyledTdTypeLink id="cell" key={tdKey} style={tdStyle}>
        {renderLinkElement()}
      </StyledTdTypeLink>
    );
  };

  // type 'tag' usually used for status
  const generateColTypeTag = (column, tdKey, tdStyle) => (
    <TagWrapper id="cell" key={tdKey} style={tdStyle}>
      {column?.value ? (
        <TooltipWrapper>
          <Tooltip placement="upper" withIcon={false} text={column.value}>
            <Lozenge
              color={column.color}
              bg={column.color}
              isOutlined
              text={column.value}
            />
          </Tooltip>
        </TooltipWrapper>
      ) : (
        '-'
      )}
    </TagWrapper>
  );

  // type 'subtitle' used for 2 sentence splitted (title and subtitle)
  const generateColTypeSubtitle = (column, tdKey, tdStyle, textStyle) => {
    const renderTitle = () => {
      const title = column?.title;
      if (!title || title === '-' || title === undefined) {
        return <Typography>-</Typography>;
      }
      const titleElement = (
        <TooltipWrapper>
          <Tooltip placement="upper" withIcon={false} text={title}>
            <Typography
              {...typographyTdTitleProps}
              style={{ ...textStyle, ...column.textTitleStyle }}
            >
              {title}
            </Typography>
          </Tooltip>
        </TooltipWrapper>
      );
      return titleElement;
    };

    const renderSubtitle = () => {
      const subtitle = column?.subtitle;
      if (subtitle === '-') {
        return <Typography>-</Typography>;
      }
      const subtitleElement = (
        <TooltipWrapper>
          <Tooltip placement="upper" withIcon={false} text={subtitle}>
            <Typography
              {...typographyTdSubtitleProps}
              style={{ ...textStyle, ...column.textSubtitleStyle }}
            >
              {subtitle}
            </Typography>
          </Tooltip>
        </TooltipWrapper>
      );
      return subtitleElement;
    };

    return (
      <td id="cell" key={tdKey} style={tdStyle}>
        <Flex flexDirection="column" gap="spacing02">
          {renderTitle()}
          {renderSubtitle()}
        </Flex>
      </td>
    );
  };

  // type 'subtitleWithText' used for 2 sentence splitted (title with link and subtitle)
  const generateColTypeSubtitleWithLink = (
    column,
    tdKey,
    tdStyle,
    textStyle,
    rowIndex,
    columnIndex
  ) => {
    const renderLinkElement = () => {
      return (
        <TooltipWrapper>
          <Tooltip
            placement={rowIndex === 0 ? 'right' : 'upper'}
            withIcon={false}
            text={column.title}
          >
            <Link
              id={`btn-link-row-${rowIndex + 1}-col-${columnIndex + 1}`}
              variant="link"
              to={column?.to}
              onClick={column.handler}
              color="neutral70"
              style={{ ...textStyle, ...column.textTitleStyle }}
            >
              <Typography
                {...typographyTdTitleProps}
                style={{
                  ...textStyle,
                  ...column.textTitleStyle,
                }}
              >
                {column.title || '-'}
              </Typography>
            </Link>
          </Tooltip>
        </TooltipWrapper>
      );
    };

    const renderSubtitleElement = () => {
      const subtitleValue = column?.subtitle;
      if (
        !subtitleValue ||
        subtitleValue === '-' ||
        subtitleValue === undefined
      ) {
        return <Typography>-</Typography>;
      }
      return (
        <TooltipWrapper>
          <Tooltip
            placement={rowIndex === 0 ? 'right' : 'upper'}
            withIcon={false}
            text={subtitleValue}
          >
            <Typography
              {...typographyTdSubtitleProps}
              style={{
                ...textStyle,
                ...column.textSubtitleStyle,
              }}
            >
              {subtitleValue}
            </Typography>
          </Tooltip>
        </TooltipWrapper>
      );
    };

    return (
      <td id="cell" key={tdKey} style={tdStyle}>
        <Flex flexDirection="column" gap="spacing02">
          {renderLinkElement()}
          {renderSubtitleElement()}
        </Flex>
      </td>
    );
  };

  // type 'subtitleWithText' used for 2 sentence splitted (both title and subtitle with link)
  const generateColTypeSubtitleWithDualLink = (
    column,
    tdKey,
    tdStyle,
    textStyle,
    rowIndex,
    columnIndex
  ) => {
    const renderTitleLinkElement = () => {
      const titleValue = column?.title;
      if (!titleValue || titleValue === '-' || titleValue === undefined) {
        return <Typography>-</Typography>;
      }
      return (
        <TooltipWrapper>
          <Tooltip
            placement={rowIndex === 0 ? 'right' : 'upper'}
            withIcon={false}
            text={titleValue}
          >
            <Link
              id={`btn-link-row-${rowIndex + 1}-col-${columnIndex + 1}`}
              variant="link"
              to={column?.to}
              onClick={column.handler}
              color="neutral70"
            >
              <Typography
                {...typographyTdTitleProps}
                style={{
                  ...textStyle,
                  ...column.textTitleStyle,
                }}
              >
                {titleValue}
              </Typography>
            </Link>
          </Tooltip>
        </TooltipWrapper>
      );
    };

    const renderSubtitleLinkElement = () => {
      const subtitleValue = column?.subtitle;
      if (
        !subtitleValue ||
        subtitleValue === '-' ||
        subtitleValue === undefined
      ) {
        return <Typography>-</Typography>;
      }
      return (
        <Sublink
          id={`btn-sublink-row-${rowIndex + 1}-col-${columnIndex + 1}`}
          variant="link"
          to={column?.subLink}
          onClick={column?.subHandler}
          color="neutral70"
        >
          <TooltipWrapper>
            <Tooltip
              placement={rowIndex === 0 ? 'right' : 'upper'}
              withIcon={false}
              text={column.subtitle}
            >
              <Typography
                {...typographyTdSubtitleProps}
                style={{
                  ...textStyle,
                  ...column.textSubtitleStyle,
                }}
              >
                {subtitleValue}
              </Typography>
            </Tooltip>
          </TooltipWrapper>
        </Sublink>
      );
    };

    return (
      <td id="cell" key={tdKey} style={tdStyle}>
        <Flex flexDirection="column" gap="spacing02">
          {renderTitleLinkElement()}
          {renderSubtitleLinkElement()}
        </Flex>
      </td>
    );
  };

  // type 'action' used for show only 1 action, e.g: edit and delete
  const generateColTypeAction = (
    column,
    tdKey,
    tdStyle,
    rowIndex,
    columnIndex,
    row
  ) => {
    const iconElement = (
      <Icon
        iconName={actionIconMap[column.subType].iconName}
        color={
          column.disabled ? 'neutral40' : actionIconMap[column.subType].color
        }
        size="16px"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointer: column.disabled ? 'not-allowed' : 'pointer',
        }}
        disabled={column.disabled}
      />
    );

    return (
      <StyledTd key={tdKey} id="cell" overflow="visible" style={tdStyle}>
        <Flex
          justifyContent="center"
          id={`action-${column.subType}-row-${rowIndex + 1}-col-${
            columnIndex + 1
          }`}
          aria-label="action"
          onClick={
            column.disabled ? undefined : handleClickAction(column.handler, row)
          }
        >
          <TooltipWrapper>
            <Tooltip
              placement="upper"
              withIcon={false}
              position={{ transform: 'translateX(-40%)' }}
              {...column.tooltipProps}
            >
              {iconElement}
            </Tooltip>
          </TooltipWrapper>
        </Flex>
      </StyledTd>
    );
  };

  // type 'multipleActions' used for show dropdown actions usually edit and delete
  const generateColTypeMultipleActions = (
    column,
    tdKey,
    tdStyle,
    rowIndex,
    row
  ) => {
    return (
      <StyledTd
        id="cell"
        key={tdKey}
        aria-label="multiple actions"
        position="relative"
        overflow="visible"
        style={tdStyle}
      >
        <Flex justifyContent="center" alignItems="center">
          <Flex
            id="action-dropdown"
            onClick={
              column.disabled ? undefined : handleClickDropdown(rowIndex)
            }
          >
            <Icon
              iconName="FilledKebabMenuVertical"
              size="16px"
              color={column.disabled ? 'neutral50' : 'blue80'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: column.disabled ? 'not-allowed' : 'pointer',
              }}
            />
          </Flex>
        </Flex>
        {isOpenActions === rowIndex && (
          <>
            {createPortal(
              <StyledActionsDropdownWrapper
                ref={dropdownRef}
                style={{
                  top: dropdownPosition.top,
                  right: dropdownPosition.right,
                }}
              >
                {column.actions?.map((action, index) => {
                  return (
                    <StyledActionsDropdown
                      key={`table-${id}-action-${action.type || index}`}
                      id={`action-${action?.type}`}
                      onClick={handleClickItemMultipleAction(
                        action.handler,
                        row
                      )}
                    >
                      {action?.type && (
                        <Icon
                          size="16px"
                          iconName={multipleActionIconMap[action.type].iconName}
                          color={multipleActionIconMap[action.type].color}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        />
                      )}
                      <Typography
                        color={
                          multipleActionIconMap[action?.type]?.color || 'blue80'
                        }
                        size="12px"
                        weight={400}
                        lineHeight="150%"
                      >
                        {action.label}
                      </Typography>
                    </StyledActionsDropdown>
                  );
                })}
              </StyledActionsDropdownWrapper>,
              document.getElementById('root')
            )}
          </>
        )}
      </StyledTd>
    );
  };

  // type 'radio' usually used for select 1 row and get row data
  const generateColTypeRadioButton = (column, tdKey, tdStyle) => (
    <StyledTdTypeRadioButton
      id="cell"
      key={tdKey}
      style={tdStyle}
      aria-label="radio-button"
    >
      <RadioButton
        id={`radio-${column.groupName}`}
        variant="standalone"
        groupName={column.groupName}
        data={column.data}
        register={column.register}
        disabled={column.disabled}
        validation={column.validation}
        handleChange={column.handleChange}
        checkedValue={column.checkedValue}
      />
    </StyledTdTypeRadioButton>
  );

  // type 'checkbox' usually used for select 1 row and get row data or what column is checked
  const generateColTypeCheckbox = (column, tdKey, tdStyle) => {
    return (
      <StyledTdTypeCheckbox
        id="cell"
        key={tdKey}
        style={tdStyle}
        aria-label="checkbox"
        checkedValue={column.checked}
      >
        <div>
          <Checkbox
            id={`radio-${column.groupName}`}
            groupName={column.groupName}
            option={column.option}
            disabled={column.disabled}
            checkedValue={column.checked}
            handleChange={column.handler}
            withLabel={false}
          />
        </div>
      </StyledTdTypeCheckbox>
    );
  };

  // type 'default' used only for typography styling e.g: column.textStyle: { textAlign: right }
  const generateColTypeDefault = (column, tdKey, tdStyle, textStyle) => {
    const renderLabel = () => {
      return (
        <TooltipWrapper>
          <Tooltip placement="upper" withIcon={false} text={column?.label}>
            <Typography
              {...typographyTdTitleProps}
              style={{ ...textStyle, ...column?.textStyle }}
            >
              {column?.label || '-'}
            </Typography>
          </Tooltip>
        </TooltipWrapper>
      );
    };

    return (
      <td id="cell" key={tdKey} style={tdStyle}>
        {renderLabel()}
      </td>
    );
  };

  const generateColumnType = (
    column,
    tdKey,
    tdStyle,
    textStyle,
    rowIndex,
    columnIndex,
    row
  ) => {
    if (!column)
      return generateColTypeDefault(column, tdKey, tdStyle, textStyle);

    switch (column.type) {
      case 'html':
        return generateColTypeHTML(column, tdKey, tdStyle, rowIndex);
      case 'link':
        return generateColTypeLink(
          column,
          tdKey,
          tdStyle,
          textStyle,
          rowIndex,
          columnIndex
        );
      case 'tag':
        return generateColTypeTag(column, tdKey, tdStyle);
      case 'subtitle':
        return generateColTypeSubtitle(column, tdKey, tdStyle, textStyle);
      case 'subtitleWithLink':
        return generateColTypeSubtitleWithLink(
          column,
          tdKey,
          tdStyle,
          textStyle,
          rowIndex,
          columnIndex
        );
      case 'subtitleWithDualLink':
        return generateColTypeSubtitleWithDualLink(
          column,
          tdKey,
          tdStyle,
          textStyle,
          rowIndex,
          columnIndex
        );
      case 'action':
        return generateColTypeAction(
          column,
          tdKey,
          tdStyle,
          rowIndex,
          columnIndex,
          row
        );
      case 'multipleActions':
        return generateColTypeMultipleActions(
          column,
          tdKey,
          tdStyle,
          rowIndex,
          row
        );
      case 'radioButton':
        return generateColTypeRadioButton(column, tdKey, tdStyle);
      case 'checkbox':
        return generateColTypeCheckbox(column, tdKey, tdStyle);
      default:
        return generateColTypeDefault(column, tdKey, tdStyle, textStyle);
    }
  };

  const applyFreezeColumn = (columnIndex) => {
    const style = {};

    if ((columnIndex === 0 || columnIndex === 1) && freezeColumn) {
      style.position = 'sticky';
      style.zIndex = 1;
      style.left = columnIndex === 0 ? '0' : `${firstColumnWidth}px`;

      if (isScrollingX) {
        style.filter =
          columnIndex === 1
            ? 'drop-shadow(24px 10px 10px rgba(0, 0, 0, 0.1))'
            : '';
      }
    }
    return style;
  };

  // if (isLoading) {
  //   return (
  //     <tbody>
  //       <tr>
  //         <td colSpan={`${columns.length}`}>
  //           <LoaderWrapper>
  //             <Image src={LoaderGIF} alt="loader" isLazy={false} />
  //           </LoaderWrapper>
  //         </td>
  //       </tr>
  //     </tbody>
  //   );
  // }

  if (isEmpty(data)) {
    return null;
  }

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={`table-${id}-row${rowIndex + 1}`}>
          {row.map((column, columnIndex) => {
            const tdKey = `table-${id}-row${rowIndex + 1}-col${
              columnIndex + 1
            }`;

            const textStyle = {
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: column?.lineClamp || 1,
              textAlign: column?.textAlign,
            };

            const tdStyle = {
              ...column?.tdStyle,
              ...applyFreezeColumn(columnIndex),
            };

            if (typeof column === 'object') {
              return generateColumnType(
                column,
                tdKey,
                tdStyle,
                textStyle,
                rowIndex,
                columnIndex,
                row
              );
            }

            return (
              <td id="cell" key={tdKey} style={tdStyle}>
                <Typography {...typographyTdTitleProps} style={textStyle}>
                  {column ?? <>-</>}
                </Typography>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.defaultProps = {
  isLoading: false,
  data: [],
  columns: [],
  firstColumnWidth: null,
  isScrollingX: false,
};

TableBody.propTypes = {
  id: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  columns: PropTypes.oneOfType([PropTypes.array, PropTypes.shape({})]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.shape([])]),
  firstColumnWidth: PropTypes.number,
  freezeColumn: PropTypes.bool.isRequired,
  isScrollingX: PropTypes.bool,
};

export default TableBody;

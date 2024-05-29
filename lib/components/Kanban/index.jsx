import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { difference, isEmpty } from 'lodash';
import {
  HeaderTitle,
  KanbanColumn,
  KanbanContainer,
  KanbanHeader,
  Radial,
  KambanList,
  Icon,
  LoaderComponent,
  RelativeWrapper,
  DropdownWrapper,
} from './style';
import KanbanCard from '../Card/kanbanCard';
import { NoData } from '../NoData';
import { Typography } from '../Typography';
import { NumberFormatter } from '../NumberFormatter';
import { Button } from '../Button';
import { LoaderGIF } from '../../assets';

const propTypes = {
  headerData: PropTypes.arrayOf(
    PropTypes.shape({
      stage: PropTypes.string.isRequired,
      totalData: PropTypes.number,
      totalAmount: PropTypes.number,
    })
  ).isRequired,
  onInfinitScroll: PropTypes.func,
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      stage: PropTypes.string.isRequired,
      idCard: PropTypes.string.isRequired,
      isWarning: PropTypes.string,
      lastUpdate: PropTypes.string,
      title: PropTypes.string,
      title2: PropTypes.string,
      amount: PropTypes.number,
      description: PropTypes.string,
      step: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          icon: PropTypes.string,
          text: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  limit: PropTypes.number,
  isSearchNotFound: PropTypes.bool,
  isHideHeaderAmount: PropTypes.bool,
  isHideHeaderTotalData: PropTypes.bool,
};
const defaultProps = {
  limit: 6,
  isSearchNotFound: false,
  isHideHeaderAmount: false,
  isHideHeaderTotalData: false,
  onInfinitScroll: async () => {},
};

const COLOR_LIST = {
  //! create another color list in accordance with limit props
  4: {
    color: ['yellow2', 'primary', 'green2', 'pink'],
    background: ['yellowShade2', 'blue10', 'greenShade2', 'pinkShade'],
  },
  6: {
    color: ['yellow2', 'green2', 'primary', 'purple', 'cyan', 'pink'],
    background: [
      'yellowShade2',
      'greenShade2',
      'blue10',
      'purpleShade',
      'cyanShade',
      'pinkShade',
    ],
  },
};

export const Kanban = (props) => {
  const {
    headerData,
    cardData,
    limit,
    isSearchNotFound,
    onInfinitScroll,
    isHideHeaderAmount,
    isHideHeaderTotalData,
  } = props;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderedData, setRenderedData] = useState([...headerData]);
  const [excessData, setExcessData] = useState(
    renderedData.splice(limit, headerData.length - limit)
  );

  const handleChangeLastData = (value) => () => {
    const tempRenderedData = [...renderedData];
    const tempExcessData = excessData.filter((item) => item.stage !== value);
    tempExcessData.unshift(...tempRenderedData.slice(-1));
    const selectedData = headerData.find((item) => item.stage === value);
    tempRenderedData.splice(tempRenderedData.length - 1, 1, selectedData);
    setRenderedData(tempRenderedData);
    setExcessData(tempExcessData);
    setOpen(!open);
  };

  const handleOpenModal = () => {
    setOpen(!open);
  };

  const handleInfinitScroll = (currentStage) => {
    if (typeof onInfinitScroll === 'function' && !isLoading) {
      setIsLoading(true);
      onInfinitScroll(currentStage).then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
    }
  };

  const handleScroll = (e, currentStage, isloadMoreStage) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    if (bottom && !isLoading && isloadMoreStage) {
      handleInfinitScroll(currentStage);
    }
  };

  useEffect(() => {
    setRenderedData([...headerData]);
  }, [headerData]);

  useEffect(() => {
    const data = difference(headerData, renderedData);
    setExcessData(data);
  }, [renderedData]);

  return (
    <KanbanContainer>
      {renderedData?.map((header, index) => {
        const lastIndex = renderedData.length === index + 1;
        const currentStage = header?.stage;
        const itemList = cardData?.filter(
          (item) => item.stage === currentStage
        );

        const isloadMoreStage = header.totalData > itemList.length;
        return (
          <KanbanColumn key={currentStage}>
            <KanbanHeader key={`header_${String(index)}`}>
              <HeaderTitle>
                {lastIndex && !isEmpty(excessData) ? (
                  <RelativeWrapper>
                    <Button
                      variant="floating"
                      size="small"
                      bgColor="transparent"
                      boxShadow="none"
                      color="neutral80"
                      padding="spacing00"
                      endIcon={open ? 'ChevronUp' : 'ChevronDown'}
                      onClick={handleOpenModal}
                    >
                      <Typography
                        variant="h3"
                        color="neutral80"
                        size="12"
                        weight={700}
                        lineHeight="150%"
                        minWidth="max-content"
                      >
                        {currentStage}
                      </Typography>
                    </Button>
                    {open && (
                      <DropdownWrapper position="right">
                        {excessData?.map((item) => {
                          return (
                            <Button
                              variant="floating"
                              size="medium"
                              bgColor="transparent"
                              boxShadow="none"
                              padding="1rem"
                              onClick={handleChangeLastData(item.stage)}
                            >
                              <Typography
                                variant="h4"
                                color="neutral80"
                                size="12"
                                weight={400}
                                lineHeight="16px"
                                letterSpacing="-0.24px"
                                minWidth="max-content"
                              >
                                {item.stage}
                              </Typography>
                            </Button>
                          );
                        })}
                      </DropdownWrapper>
                    )}
                  </RelativeWrapper>
                ) : (
                  <Typography
                    variant="h3"
                    color="neutral80"
                    size="12"
                    weight={700}
                    lineHeight="150%"
                    minWidth="max-content"
                  >
                    {currentStage}
                  </Typography>
                )}
                {!isHideHeaderTotalData && (
                  <Radial
                    color={COLOR_LIST[limit]?.color[index]}
                    background={COLOR_LIST[limit]?.background[index]}
                  >
                    <Typography size="10px" weight={500} lineHeight="150%">
                      {header.totalData || 0}
                    </Typography>
                  </Radial>
                )}
              </HeaderTitle>
              <Typography
                variant="h3"
                size="10px"
                color="neutral70"
                weight={700}
              >
                {itemList?.length > 0 ? (
                  !isHideHeaderAmount && (
                    <NumberFormatter
                      language="en"
                      abbreviate
                      value={header?.totalAmount}
                    />
                  )
                ) : (
                  <>
                    {!isHideHeaderAmount && <div>-</div>}
                    {isSearchNotFound === true ? (
                      <NoData
                        image
                        headerText="Data Tidak Ditemukan"
                        bodyText="Data Tidak Ditemukan"
                        isSearchNotFound
                      />
                    ) : (
                      <NoData
                        image
                        headerText="Data Tidak Tersedia"
                        bodyText="Data Tidak Tersedia"
                      />
                    )}
                  </>
                )}
              </Typography>
            </KanbanHeader>
            <KambanList
              onScroll={(e) => handleScroll(e, currentStage, isloadMoreStage)}
            >
              {itemList?.map((card, indexItem) => {
                return (
                  <KanbanCard
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...card}
                    key={card?.idCard}
                    isMarginBottom={indexItem === itemList.length - 1}
                  />
                );
              })}

              {itemList?.length > 0 && isloadMoreStage && (
                <LoaderComponent>
                  <Icon src={LoaderGIF} alt="Loading..." />
                </LoaderComponent>
              )}
            </KambanList>
          </KanbanColumn>
        );
      })}
    </KanbanContainer>
  );
};

Kanban.defaultProps = defaultProps;
Kanban.propTypes = propTypes;

export default Kanban;

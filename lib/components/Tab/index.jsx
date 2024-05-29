import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  handleAuthorizeAccess,
  browserHistory,
  Checkpoints,
} from '../../utils';
import { Typography } from '../Typography';
import { Button } from '../Button';
import {
  Header,
  InnerTabContainer,
  LiStyles,
  OuterLiStyles,
  OuterSpanStyles,
  SpanStyles,
  StickyButton,
  TabContainer,
} from './styled';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

export const Tabs = (props) => {
  const {
    tabs,
    variant,
    onSelect,
    withIcon,
    width,
    margin,
    isControlled,
    isOnClick,
    onClick,
    selectedTab,
  } = props;

  const { authorizedTabs, unAuthorizedTabs } = Object.entries(tabs).reduce(
    (acc, [tabKey, tab]) => {
      // Authorized tab with menu id
      const isAuthorizedMenuId =
        (tab.menuId && handleAuthorizeAccess(tab.menuId)) || !tab.menuId;

      // Authorized tab with custom conditions
      const isAuthorized = tab.isAuthorized || tab.isAuthorized === undefined;

      if (isAuthorizedMenuId && isAuthorized) {
        acc.authorizedTabs[tabKey] = tab;
      } else {
        acc.unAuthorizedTabs[tabKey] = tab;
      }
      return acc;
    },
    { authorizedTabs: {}, unAuthorizedTabs: {} }
  );

  const [showSticky, setShowSticky] = useState(false);
  const [activeTab, setActiveTab] = useState(Object.keys(authorizedTabs)[0]);

  const {
    location: { search, pathname },
    push,
  } = browserHistory;

  const IconMapping = (iconName, isActive) => {
    let mappedIconName = iconName;
    if (iconName === 'Other') {
      mappedIconName = 'Candlestick';
    }

    const iconColor = isActive ? 'primary' : null;

    return <Icon iconName={mappedIconName} color={iconColor} size="16px" />;
  };

  const handleSearchParam = (tabKey) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('tab', authorizedTabs[tabKey].searchParam);

    push({
      pathname,
      search: searchParams.toString(),
    });
  };

  const handleTabClick = (tabKey) => {
    if (!authorizedTabs[tabKey]?.disable && isOnClick) {
      setActiveTab(tabKey);
      onSelect(tabKey);

      if (authorizedTabs[tabKey]?.searchParam) {
        handleSearchParam(tabKey);
      }
    } else {
      onClick(tabKey);
    }
  };

  const handleResize = () => {
    const tabContainer = document.getElementById('tabContainer');
    if (tabContainer) {
      setShowSticky(tabContainer.scrollWidth > tabContainer.clientWidth);
    }
  };

  const handleUnauthorizedAccess = () => {
    if (!search || !Object.keys(unAuthorizedTabs).length) return;

    const searchParam = new URLSearchParams(search).get('tab') || '';
    const isNotAuthorized = Object.values(unAuthorizedTabs).some(
      (tab) => tab?.searchParam === searchParam
    );

    if (isNotAuthorized) {
      browserHistory.push(Checkpoints.notFound);
    }
  };

  useEffect(() => {
    if (!isControlled) onSelect(activeTab);
  }, [onSelect, activeTab, isControlled]);

  useEffect(() => {
    if (isControlled) setActiveTab(selectedTab);
  }, [isControlled, selectedTab]);

  useEffect(() => {
    handleUnauthorizedAccess();
    handleResize();
    window.addEventListener('resize', handleResize);

    const defaultKey = Object.keys(authorizedTabs)[0];
    if (!search && authorizedTabs[defaultKey]?.searchParam) {
      handleTabClick(authorizedTabs[defaultKey].searchParam);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const keyTab = Object.keys(authorizedTabs);

  const tabColor = (tabKey) => {
    if (tabKey === activeTab) return 'primary';
    if (authorizedTabs[tabKey].disable) return 'neutral40';
    return 'neutral70';
  };

  const renderOuterTab = () => {
    return (
      <Header id="tabHeader">
        <TabContainer
          id="tabContainer"
          width={width}
          margin={margin}
          variant={variant}
          active={activeTab}
        >
          {variant === 'outer' &&
            keyTab.map((tabKey, idx) => {
              const zIndex = keyTab.length - idx;
              return (
                <OuterLiStyles
                  id={`tab-${authorizedTabs[tabKey]?.text?.toLowerCase()}`}
                  width={authorizedTabs[tabKey].width}
                  key={tabKey}
                  onClick={() => handleTabClick(tabKey)}
                  role="tab"
                  tabIndex={0}
                  aria-selected={tabKey === activeTab}
                  active={tabKey === activeTab}
                  disabled={authorizedTabs[tabKey].disable}
                  zIndex={zIndex}
                >
                  {withIcon && (
                    <OuterSpanStyles
                      active={tabKey === activeTab}
                      disabled={authorizedTabs[tabKey].disable}
                    >
                      {IconMapping(
                        authorizedTabs[tabKey].icon,
                        tabKey === activeTab
                      ) || ''}
                    </OuterSpanStyles>
                  )}
                  {Boolean(authorizedTabs[tabKey].tooltipText) &&
                    tabKey === activeTab && (
                      <Tooltip
                        title={authorizedTabs[tabKey].tooltipTitle}
                        width="25rem"
                        text={authorizedTabs[tabKey].tooltipText}
                        placement="upper"
                      >
                        &nbsp;
                      </Tooltip>
                    )}
                  <Typography
                    size="1.4rem"
                    weight={tabKey === activeTab ? 600 : 400}
                    lineHeight="21px"
                    elipsis
                    color={tabColor(tabKey)}
                  >
                    {authorizedTabs[tabKey].text}
                    {authorizedTabs[tabKey].count !== undefined
                      ? `(${authorizedTabs[tabKey].count})`
                      : ''}
                  </Typography>
                </OuterLiStyles>
              );
            })}
        </TabContainer>
        <StickyButton show={showSticky}>
          <Button
            id="button-minimize-right"
            variant="floating"
            bgColor="neutral5"
            borderRadius="100%"
            height="28px"
            width="28px"
            onClick={() =>
              handleTabClick(keyTab[keyTab.indexOf(activeTab) + 1])
            }
            padding="0.4rem"
            disabled={keyTab.indexOf(activeTab) === keyTab.length - 1}
          >
            <Icon iconName="ChevronRight" size="24px" />
          </Button>
        </StickyButton>
      </Header>
    );
  };

  const renderInnerTab = () => {
    return (
      <InnerTabContainer
        className="innertab"
        width={width}
        margin={margin}
        variant={variant}
      >
        {keyTab.map((tabKey) => {
          return (
            <LiStyles
              id={`tab-${authorizedTabs[tabKey]?.text?.toLowerCase()}`}
              width={authorizedTabs[tabKey].width}
              key={tabKey}
              onClick={() => handleTabClick(tabKey)}
              role="tab"
              tabIndex={0}
              aria-selected={tabKey === activeTab}
              active={tabKey === activeTab}
              disabled={authorizedTabs[tabKey].disable}
              activeTabColor={tabColor(tabKey)}
            >
              {withIcon && (
                <SpanStyles
                  active={tabKey === activeTab}
                  disabled={authorizedTabs[tabKey].disable}
                >
                  {IconMapping(
                    authorizedTabs[tabKey].icon,
                    tabKey === activeTab
                  ) || ''}
                </SpanStyles>
              )}
              <Typography
                size="1.4rem"
                weight={tabKey === activeTab ? 600 : 400}
                lineHeight="21px"
                elipsis
                color={tabColor(tabKey)}
              >
                {authorizedTabs[tabKey].text}{' '}
                {authorizedTabs[tabKey].count !== undefined
                  ? `(${authorizedTabs[tabKey].count})`
                  : ''}
              </Typography>
            </LiStyles>
          );
        })}
      </InnerTabContainer>
    );
  };

  return variant === 'outer' ? renderOuterTab() : renderInnerTab();
};

Tabs.defaultProps = {
  tabs: {},
  variant: 'inner',
  onSelect: () => {},
  withIcon: false,
  isOnClick: true,
  onClick: () => {},
  width: 'auto',
  margin: '',
  isControlled: false,
  selectedTab: '',
};

Tabs.propTypes = {
  isOnClick: PropTypes.bool,
  onClick: PropTypes.func,
  tabs: PropTypes.objectOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      disable: PropTypes.bool,
      icon: PropTypes.string,
      width: PropTypes.string,
      menuId: PropTypes.string,
    })
  ),
  variant: PropTypes.oneOf(['outer', 'inner']),
  onSelect: PropTypes.func,
  withIcon: PropTypes.bool,
  width: PropTypes.string,
  margin: PropTypes.string,
  isControlled: PropTypes.bool,
  selectedTab: PropTypes.string,
  activeTabColor: PropTypes.string,
};

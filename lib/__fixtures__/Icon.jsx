import React from 'react';
import { Icon } from '../components';
import * as Icons from '../assets';

const iconsMapping = Object.fromEntries(
  Object.entries(Icons).map(([key, value]) => [key, { value }])
);

const AllIcons = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, auto)',
        gap: 16,
        padding: '1rem',
      }}
    >
      {Object.keys(iconsMapping).map((key) => {
        return (
          <div>
            <Icon iconName={key} />
            <p>{key}</p>
          </div>
        );
      })}
    </div>
  );
};

const OutlinedIcons = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, auto)',
        gap: 16,
        padding: '1rem',
      }}
    >
      {Object.keys(iconsMapping).map((key) => {
        const filteredIcon = key.includes('Outlined');
        if (filteredIcon) {
          return (
            <div>
              <Icon iconName={key} />
              <p>{key}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const FilledIcons = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, auto)',
        gap: 16,
        padding: '1rem',
      }}
    >
      {Object.keys(iconsMapping).map((key) => {
        const filteredIcon = key.includes('Filled');
        if (filteredIcon) {
          return (
            <div>
              <Icon iconName={key} color="green" />
              <p>{key}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const SideMenuIcons = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, auto)',
        gap: 16,
        padding: '1rem',
      }}
    >
      {Object.keys(iconsMapping).map((key) => {
        const filteredIcon = key.includes('SideMenu');
        if (filteredIcon) {
          return (
            <div>
              <Icon iconName={key} />
              <p>{key}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default {
  all: <AllIcons />,
  outlined: <OutlinedIcons />,
  filled: <FilledIcons />,
  'side menu': <SideMenuIcons />,
  others: (
    <div
      style={{
        padding: 20,
        display: 'flex',
        gap: 10,
      }}
    >
      <Icon iconName="Attachment" />
      <Icon iconName="KnowledgeCenter" />
      <Icon iconName="Notification" />
    </div>
  ),
  navigation: (
    <div
      style={{
        padding: 20,
        display: 'flex',
        gap: 10,
      }}
    >
      <Icon iconName="ArrowDown" />
      <Icon iconName="ArrowLeft" />
      <Icon iconName="ArrowRight" />
      <Icon iconName="ArrowUp" />
      <Icon iconName="ChevronDown" />
      <Icon iconName="ChevronLeft" />
      <Icon iconName="ChevronRight" />
      <Icon iconName="ChevronUp" />
      <Icon iconName="Sort" />
    </div>
  ),
  action: (
    <div
      style={{
        padding: 20,
        display: 'flex',
        gap: 10,
      }}
    >
      <Icon iconName="Accept" />
      <Icon iconName="AddNew" />
      <Icon iconName="Calendar" />
      <Icon iconName="Delete" />
      <Icon iconName="Detail" />
      <Icon iconName="Download" />
      <Icon iconName="Edit" />
      <Icon iconName="Filter" />
      <Icon iconName="Hide" />
      <Icon iconName="Kanban" />
      <Icon iconName="LogOut" />
      <Icon iconName="Profile" />
      <Icon iconName="Search" />
      <Icon iconName="Show" />
    </div>
  ),
  'Checkmark Icon Size 16px': (
    <div
      style={{
        width: '16px',
        height: '16px',
        background: 'black',
      }}
    >
      <Icon iconName="Checkmark" size="16px" />
    </div>
  ),
  'Checkmark Icon Size 16px Custom Style': (
    <div
      style={{
        width: '200px',
        height: '200px',
        background: 'black',
      }}
    >
      <Icon
        iconName="Checkmark"
        size="16px"
        style={{
          margin: '24px',
          padding: '20px',
          border: '3px solid white',
        }}
      />
    </div>
  ),
};

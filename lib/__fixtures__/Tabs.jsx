import React from 'react';
import { Tabs } from '../components/Tab';

const ContainerTabs = {
  default: (
    <div>
      <Tabs
        tabs={{
          Revenue: { text: 'Tab 1' },
          Subscriber: { text: 'Tab 2' },
          Traffic: { text: 'Tab 2' },
          Other: { text: 'Tab 3' },
        }}
        onSelect={() => {}}
      />
    </div>
  ),
  withIcon: (
    <div>
      <Tabs
        tabs={{
          Revenue: { text: 'Revenue', icon: 'Other' },
          Subscriber: { text: 'Subscriber', icon: 'Subscriber' },
          Traffic: { text: 'Traffic', icon: 'Traffic' },
          Other: { text: 'Other', icon: 'Other' },
        }}
        onSelect={() => {}}
        withIcon
      />
    </div>
  ),
  disable: (
    <div>
      <Tabs
        tabs={{
          Revenue: { text: 'Revenue', disable: true },
          Subscriber: { text: 'Subscriber', disable: true },
          Traffic: { text: 'Traffic', disable: true },
          Other: { text: 'Other', disable: true },
        }}
        onSelect={() => {}}
      />
    </div>
  ),
};

export default ContainerTabs;

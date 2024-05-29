/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Accordion, Typography } from '../components';

const Single = ({ variant }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <Accordion
        visible={visible}
        title="Title"
        onChange={() => setVisible(!visible)}
        borderBottom
        id="accord1"
        variant={variant}
      >
        <Typography color="neutral70" size="1.4rem">
          This accordion allows the user to hide or reveal large amount of
          content in a small space. It usually have two state: Expand and
          Collapse. This accordion allows the user to hide or reveal large
          amount of content in a small space. Accordion usually have two state.
        </Typography>
      </Accordion>
    </div>
  );
};

const Multiple = () => {
  const [activeAccord, setActiveAccord] = useState(null);

  const handleToggle = (accord) => {
    if (accord === activeAccord) return setActiveAccord(null);
    return setActiveAccord(accord);
  };
  return (
    <div style={{ padding: 20 }}>
      <Accordion
        visible={activeAccord === 'accord1'}
        title="Title"
        onChange={handleToggle}
        id="accord1"
      >
        <Typography color="neutral70" size="1.4rem">
          This accordion allows the user to hide or reveal large amount of
          content in a small space. It usually have two state: Expand and
          Collapse. This accordion allows the user to hide or reveal large
          amount of content in a small space. Accordion usually have two state.
        </Typography>
      </Accordion>
      <Accordion
        visible={activeAccord === 'accord2'}
        title="Title 2"
        onChange={handleToggle}
        id="accord2"
      >
        <Typography color="neutral70" size="1.4rem">
          This accordion allows the user to hide or reveal large amount of
          content in a small space. It usually have two state: Expand and
          Collapse. This accordion allows the user to hide or reveal large
          amount of content in a small space. Accordion usually have two state.
        </Typography>
      </Accordion>
      <Accordion
        visible={activeAccord === 'accord3'}
        title="Title 3"
        onChange={handleToggle}
        id="accord3"
        borderBottom
      >
        <Typography color="neutral70" size="1.4rem">
          This accordion allows the user to hide or reveal large amount of
          content in a small space. It usually have two state: Expand and
          Collapse. This accordion allows the user to hide or reveal large
          amount of content in a small space. Accordion usually have two state.
        </Typography>
      </Accordion>
    </div>
  );
};
export default {
  Single: <Single variant="main" />,
  multiple: <Multiple />,
  'Single Filled': <Single variant="filled" />,
};

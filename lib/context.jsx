import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const ActionContext = createContext();
export const DataContext = createContext();

export const PageContext = ({ actions, children, data }) => (
  <ActionContext.Provider value={actions}>
    <DataContext.Provider value={data}>{children}</DataContext.Provider>
  </ActionContext.Provider>
);

PageContext.defaultProps = {
  actions: {},
  data: {},
};

PageContext.propTypes = {
  actions: PropTypes.shape(),
  children: PropTypes.node.isRequired,
  data: PropTypes.shape(),
};

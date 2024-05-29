import React from 'react';
import styled from 'styled-components';
import { Tooltip, Typography } from '../components';

const Wrapper = styled.div`
  margin-top: 150px;
  margin-left: 400px;
`;

export default {
  'default / bottom placement': (
    <Wrapper>
      <Tooltip placement="bottom">
        <Typography size="24px">Hover Me!</Typography>
      </Tooltip>
    </Wrapper>
  ),
  'upper placement': (
    <Wrapper>
      <Tooltip placement="upper">
        <Typography size="24px">Hover Me!</Typography>
      </Tooltip>
    </Wrapper>
  ),
  'left placement': (
    <Wrapper>
      <Tooltip placement="left">
        <Typography size="24px">Hover Me!</Typography>
      </Tooltip>
    </Wrapper>
  ),
  'right placement': (
    <Wrapper>
      <Tooltip placement="right">
        <Typography size="24px">Hover Me!</Typography>
      </Tooltip>
    </Wrapper>
  ),
};

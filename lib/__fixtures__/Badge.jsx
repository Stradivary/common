/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { Badge, Typography } from '../components';

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export default {
  Default: () => (
    <Container>
      <Wrapper>
        <Typography>Default Variant</Typography>
        <Badge id="default1" label="Unified" />
      </Wrapper>
    </Container>
  ),
  Notification: () => (
    <Container>
      <Wrapper>
        <Typography>
          Notification Variant & Record Less Than 99 items
        </Typography>
        <Badge id="notification2" label="12" variant="notification" />
      </Wrapper>
      <Wrapper>
        <Typography>
          Notification Variant & Record More Than 99 items
        </Typography>
        <Badge id="notification1" label="1234" variant="notification" />
      </Wrapper>
      <Wrapper>
        <Typography>Notification Variant Outlined</Typography>
        <Badge
          id="notification1"
          label="1234"
          variant="notification"
          backgroundColor="transparent"
          outlineColor="#BA192A"
          style={{
            color: '#4E5764',
          }}
        />
      </Wrapper>
    </Container>
  ),
  Icon: () => (
    <Container>
      <Wrapper>
        <Typography>Icon Variant & Status Available</Typography>
        <Badge id="icon11" variant="icon" iconStatus="available" />
      </Wrapper>
      <Wrapper>
        <Typography>Icon Variant & Status Away</Typography>
        <Badge id="icon12" variant="icon" iconStatus="away" />
      </Wrapper>
      <Wrapper>
        <Typography>Icon Variant & Status Do Not Disturb</Typography>
        <Badge id="icon13" variant="icon" iconStatus="do-not-disturb" />
      </Wrapper>
      <Wrapper>
        <Typography>Icon Variant & Status Offline</Typography>
        <Badge id="icon14" variant="icon" iconStatus="error" />
      </Wrapper>
    </Container>
  ),
  Dot: () => (
    <Container>
      <Wrapper>
        <Typography>Default Dot Variant</Typography>
        <Badge id="dot1" variant="dot" />
      </Wrapper>
      <Wrapper>
        <Typography>Dot Variant With Outline Color</Typography>
        <Badge id="dot2" variant="dot" outlineColor="blue" />
      </Wrapper>
      <Wrapper>
        <Typography>Dot Variant With Custom Background Color</Typography>
        <Badge id="dot3" variant="dot" backgroundColor="blue" />
      </Wrapper>
    </Container>
  ),
  'Badge In Icon/Image': () => (
    <Container>
      <Wrapper>
        <Typography>Badge In Icon</Typography>
        <IconWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="40"
          >
            <path d="M22 5v4l-10 4L2 9V5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1zM2 11.154V19a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-7.846l-10 4z" />
          </svg>
          <Badge
            id="notification 3"
            label="123"
            variant="notification"
            style={{ position: 'absolute', top: '-10%', left: '50%' }}
          />
        </IconWrapper>
      </Wrapper>
      <Wrapper>
        <Typography>Badge In Image</Typography>
        <IconWrapper>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile"
            height="45px"
            width="45px"
            style={{ borderRadius: '100%' }}
          />
          <Badge
            id="notification 3"
            variant="dot"
            outlineColor="white"
            style={{ position: 'absolute', top: '-2.5%', right: '5%' }}
          />
        </IconWrapper>
      </Wrapper>
    </Container>
  ),
};

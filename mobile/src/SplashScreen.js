import React from 'react';
import styled from 'styled-components';
import { ActivityIndicator } from 'react-native';

const SplashScreen = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background: #171717;
`;

export default () => (
  <SplashScreen>
    <ActivityIndicator size="large" />
  </SplashScreen>
);
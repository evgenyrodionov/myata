import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import IconHeaderPoint from './icons/HeaderPoint';

const HeaderTextButtonSt = styled.TouchableOpacity`
  margin-horizontal: 16;
`;

const HeaderTextButtonText = styled.Text`
  font-size: 17;
  line-height: 17;
  font-weight: 600;
  color: #fff;
`;

export function HeaderTextButton({ children, ...props }) {
  return (
    <HeaderTextButtonSt {...props}>
      <HeaderTextButtonText>{children}</HeaderTextButtonText>
    </HeaderTextButtonSt>
  );
}

const IconHeaderPointWrapper = styled.TouchableOpacity`
  padding-horizontal: 8;
  padding-top: 4;
`;

export default function HeaderButton({ children, isActive, ...props }) {
  if (isActive) {
    return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
  }

  return (
    <IconHeaderPointWrapper {...props}>
      <IconHeaderPoint />
    </IconHeaderPointWrapper>
  );
}

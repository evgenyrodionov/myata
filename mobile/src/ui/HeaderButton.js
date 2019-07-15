import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import IconHeaderPoint from './icons/HeaderPoint';

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

import React from 'react';
import styled from 'styled-components';

const HeaderTextButtonSt = styled.TouchableOpacity`
  margin-horizontal: 16;
`;

const HeaderTextButtonText = styled.Text`
  font-size: 17;
  line-height: 17;
  font-weight: 600;
  color: #fff;
`;

// eslint-disable-next-line import/prefer-default-export
export function HeaderTextButton({ children, ...props }) {
  return (
    <HeaderTextButtonSt {...props}>
      <HeaderTextButtonText>{children}</HeaderTextButtonText>
    </HeaderTextButtonSt>
  );
}

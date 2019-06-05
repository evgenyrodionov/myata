import React from 'react';
import styled from 'styled-components';

const HeaderButtonSt = styled.TouchableOpacity`
  margin-horizontal: 16;
`;
const HeaderButtonText = styled.Text`
  font-size: 17;
  line-height: 17;
  font-weight: 600;
  color: #fff;
`;

export default function HeaderButton({ children, ...props }) {
  return (
    <HeaderButtonSt {...props}>
      <HeaderButtonText>{children}</HeaderButtonText>
    </HeaderButtonSt>
  );
}

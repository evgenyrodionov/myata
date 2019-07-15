import React from 'react';
import styled from 'styled-components';

const ButtonSt = styled.TouchableOpacity`
  padding-vertical: 12;
  padding-horizontal: 12;
  margin-bottom: 8;
  background-color: ${p => p.color};
  border-radius: 8;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: 14;
  font-weight: 600;
  line-height: 22;
  color: ${p => p.color};
  text-align: ${p => (p.center ? 'center' : 'left')};
`;

const Icon = styled.View`
  margin-right: 8;
`;

const Button = ({
  children, bgColor, textColor, center, ...props
}) => (
  <ButtonSt color={bgColor} {...props}>
    <Text center={center} color={textColor}>
      {children}
    </Text>
  </ButtonSt>
);

export const ButtonWithIcon = ({
  children,
  icon,
  bgColor,
  textColor,
  center,
  ...props
}) => (
  <ButtonSt color={bgColor} {...props}>
    <Icon>{icon}</Icon>
    <Text center={center} color={textColor}>
      {children}
    </Text>
  </ButtonSt>
);

export default Button;

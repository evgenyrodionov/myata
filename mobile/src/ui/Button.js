import React from 'react';
import styled from 'styled-components';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  gradientButton: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
})


const ButtonSt = styled.TouchableOpacity`
  padding-vertical: 12;
  padding-horizontal: 12;
  margin-bottom: 8;
  border-radius: 8;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  background-color: ${p => p.color};
`;

const GradientWrapper = styled.TouchableOpacity`
  width: 100%;
`


const Text = styled.Text`
  font-size: 14;
  font-weight: 600;
  line-height: 22;
  color: ${p => p.color};
  text-align: ${p => (p.center ? 'center' : 'left')};
  width: 100%;
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

export const GradientButtonWithIcon = ({
  children,
  icon,
  colors,
  textColor,
  center,
  ...props
}) =>  (
  <GradientWrapper {...props}>
    <LinearGradient style={styles.gradientButton} start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={colors}  useAngle={true} angle={179} angleCenter={{ x: 0.5, y: 0.5}}>
      <Icon>{icon}</Icon>
        <Text center={center} color={textColor}>
          {children}
        </Text>
    </LinearGradient>
  </GradientWrapper>
);



export default Button;

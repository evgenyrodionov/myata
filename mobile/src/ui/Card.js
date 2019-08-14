import React from 'react';
import styled from 'styled-components';
import { BlurView } from '@react-native-community/blur';
import IconArrow from './icons/Arrow';
import FooterPusher from './FooterPusher';

const View = styled.ScrollView`
  margin-top: 96;
  padding-top: 16;
  padding-horizontal: 16;
  background-color: #111;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  position: relative;
`;

const Close = styled(BlurView)`
  display: flex;
  align-items: center;
  position: absolute;
  padding-top: 12;
  padding-bottom: 12;
  top: 48;
  left: 0;
  right: 0;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
`;

const IconArrowButton = styled.TouchableOpacity`
  padding-vertical: 12;
  padding-horizontal: 12;
`;

export default function Card({ onGoBack, children }) {
  return (
    <>
      <Close blurType="extraDark">
        <IconArrowButton onPress={onGoBack}>
          <IconArrow color="#eee" />
        </IconArrowButton>
      </Close>

      <View>
        {children}

        <FooterPusher size={96} />
      </View>
    </>
  );
}

import React from 'react';
import styled from 'styled-components';
import { BlurView } from '@react-native-community/blur';
import { isIphoneX } from 'react-native-iphone-x-helper';
import IconArrow from './icons/Arrow';
import FooterPusher from './FooterPusher';

const topOffset = 48;

const View = styled.ScrollView`
  margin-top: ${isIphoneX() ? topOffset : topOffset / 1.5};
  padding-top: 48;
  padding-horizontal: 16;
  background-color: #111;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  position: relative;
`;

const Close = styled.TouchableOpacity`
  background: #111;
  /* background: #fff; */
  display: flex;
  align-items: center;
  position: absolute;
  padding-top: 20;
  padding-bottom: 8;
  top: ${isIphoneX() ? topOffset : topOffset / 1.5};
  z-index: 1000;
  left: 0;
  right: 0;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
`;

export default function Card({ onGoBack, children }) {
  return (
    <>
      <Close blurType="extraDark" onPress={onGoBack}>
        <IconArrow color="#eee" />
      </Close>

      <View>
        {children}

        <FooterPusher size={96} />
      </View>
    </>
  );
}

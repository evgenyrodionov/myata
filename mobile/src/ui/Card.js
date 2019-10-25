import React from 'react';
import styled from 'styled-components';
import { isIphoneX } from 'react-native-iphone-x-helper';
import IconArrow from './icons/Arrow';
import FooterPusher from './FooterPusher';

const topOffset = 48;

const getOffset = (stackLevel) => {
  const baseOffset = topOffset * stackLevel;
  const offsetWithLevel = baseOffset * 0.75;

  if (stackLevel > 1) {
    return isIphoneX() ? offsetWithLevel : offsetWithLevel / 1.5;
  }

  return isIphoneX() ? baseOffset : baseOffset / 1.5;
};

const View = styled.ScrollView`
  margin-top: ${p => getOffset(p.stackLevel)};
  padding-top: 48;
  padding-horizontal: ${({ withoutPadding }) => (withoutPadding ? 0 : 16)};
  background-color: #111;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  position: relative;
`;

const Close = styled.TouchableOpacity.attrs({ activeOpacity: 0.9 })`
  background: #111;
  /* background: #fff; */
  display: flex;
  align-items: center;
  position: absolute;
  padding-top: 20;
  padding-bottom: 20;
  top: ${p => getOffset(p.stackLevel)};
  z-index: 1000;
  left: 0;
  right: 0;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
`;

export default function Card({
  onGoBack,
  stackLevel = 1,
  withoutPadding,
  children,
}) {
  return (
    <>
      <Close blurType="extraDark" stackLevel={stackLevel} onPress={onGoBack}>
        <IconArrow color="#eee" />
      </Close>

      <View stackLevel={stackLevel} withoutPadding={withoutPadding}>
        {children}

        <FooterPusher size={96} />
      </View>
    </>
  );
}

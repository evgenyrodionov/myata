import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import styled from 'styled-components';
import ruLocale from 'date-fns/locale/ru';
import format from 'date-fns/format';
import * as Haptics from 'expo-haptics';
import Markdown from 'react-native-easy-markdown';

import Typograf from 'typograf';
import { elevationShadowStyle } from '../../utils/shadow';
import * as animateScale from '../../utils/animateScale';

const tp = new Typograf({ locale: ['ru', 'en-US'] });

const styles = StyleSheet.create({
  view: {
    ...elevationShadowStyle({
      elevation: 11,
      shadowColor: '#111',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowOffsetWidthMultiplier: 0.5,
      shadowOffsetHeightMultiplier: 0.5,
    }),
  },
});

const View = styled.View`
  border-radius: 10;
  background-color: #77455d;
`;

const StCard = styled.View`
  padding-horizontal: 16;
  padding-top: 20;
  padding-bottom: 16;
  height: 320;
  width: 100%;

  border-radius: 10;
  /* background: rgba(17, 17, 17, 0.6); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 36;
  line-height: 36;
  font-weight: 700;
  color: #f1f379;
`;

const Description = styled(Markdown)`
  width: 70%;
`;

const Footer = styled.View`
  flex: 1;
  /* justify-content: space-between;
  flex-direction: row; */
  position: absolute;
  bottom: 8;
  left: 16;
`;

const DateHelper = styled.Text`
  font-size: 14;
  color: ${p => p.color};
  margin-top: 6;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const defaultDateFormat = eventAt =>
  format(eventAt, 'DD MMMM в HH:MM', { locale: ruLocale });

export default function EventCard({
  item,
  dateFormat = defaultDateFormat,
  onPress: parentOnPress = () => ({}),
}) {
  const scaleInAnimated = new Animated.Value(0);
  // const shadowElevationAnimated = new Animated.Value(11);

  function onPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    parentOnPress();
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      onPressIn={() => animateScale.pressInAnimation(scaleInAnimated)}
      onPressOut={() => animateScale.pressOutAnimation(scaleInAnimated)}
      style={animateScale.getScaleTransformationStyle(scaleInAnimated)}
    >
      <Animated.View>
        <View style={[styles.view]}>
          <StCard>
            <Title>{item.title}</Title>
            <Description
              debug
              markdownStyles={{
                text: {
                  fontSize: 18,
                  lineHeight: 20,
                  fontWeight: '400',
                  color: '#f1f379',
                },
              }}
            >
              {tp.execute(item.description)}
            </Description>
            <Footer>
              {item.eventAt && (
                <DateHelper color="#fff">{dateFormat(item.eventAt)}</DateHelper>
              )}
            </Footer>
          </StCard>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

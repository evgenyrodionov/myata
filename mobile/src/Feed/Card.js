import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import styled from 'styled-components';
import ruLocale from 'date-fns/locale/ru';
import format from 'date-fns/format';
import * as Haptics from 'expo-haptics';
import Markdown from 'react-native-easy-markdown';

import Typograf from 'typograf';
import { elevationShadowStyle } from '../utils/shadow';
import * as animateScale from '../utils/animateScale';

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
  background-color: #262626;
`;

const StCard = styled.View`
  padding-horizontal: 16;
  padding-top: 20;
  padding-bottom: 16;
  width: 100%;

  border-radius: 10;
  display: flex;
  flex-direction: column;
`;

const Header = styled.View`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 32;
  line-height: 36;
  font-weight: 600;
  color: #fff;
  flex-basis: 70%;
`;

const Icon = styled.View`
  background-color: rgba(251, 196, 33, 0.2);
  border-radius: 56;
  padding-horizontal: 12;
  padding-vertical: 12;
  max-width: 52;
  max-height: 52;

  margin-left: 12;
`;

const IconText = styled.Text`
  font-size: 24;
  line-height: 26;
`;

const Description = styled(Markdown)`
  margin-top: 32;
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

const tempDescriptions = {
  q6LH1HJbzblw8peq2Aqm:
    'То, чего вы так ждали (и мы!) — наш первый тестовый запуск.\n\nКаждый день мы будем улучшать приложение, но уже — добро пожаловать в Мятную семью 🤗',
  rqQSbkbZwMrXvt2tgEA6:
    'Совсем скоро мы запустим крутой мятный сайт. Еще на шаг ближе к нашим гостям!\n\n * Вы сможете найти Мяту практически в любом уголке России\n * Удобная система бронирования для каждой Мяты\n * Вечеринки и мероприятия\n * Анонсы событий\n * Фишки каждого нашего заведения',
  fORadsDM2XBF8vxxUWRD:
    '* Мята Lounge насчитывает более 200 заведений по всей России и странам СНГ\n* Каждый месяц нас посещают более 200 000 гостей\n* Мы открыты более, чем в 120 городаx',
  TQki3q1eesZK1fna4YOK:
    'Да, мы это сделали!\n\nТеперь вы можете следить за всеми новостями сети в нашем официальном аккаунте [@myata.official](https://instagram.com/myata.official)',
};

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
            <Header>
              <Title>{item.title}</Title>
              <Icon>
                <IconText>⭐</IconText>
              </Icon>
            </Header>
            <Description
              markdownStyles={{
                text: {
                  fontSize: 18,
                  lineHeight: 24,
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            >
              {tempDescriptions[item.id]}
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

import React from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import ruLocale from 'date-fns/locale/ru';
import getDay from 'date-fns/get_day';
import isFuture from 'date-fns/is_future';
import format from 'date-fns/format';
import capitalize from 'capitalize';
import * as Haptics from 'expo-haptics';
import { elevationShadowStyle } from '../utils/shadow';
import * as animateScale from '../utils/animateScale';
import { getPhotoUrl } from '../utils/photos';

import { IconHeart, IconFutureClock as OrigIconFutureClock } from '../ui';

const styles = StyleSheet.create({
  card: {
    ...elevationShadowStyle({
      elevation: 11,
      shadowColor: '#171717',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowOffsetWidthMultiplier: 0.5,
      shadowOffsetHeightMultiplier: 0.5,
    }),
  },
});

const StCard = styled.View`
  padding-horizontal: 16;
  padding-top: 20;
  padding-bottom: 16;
  height: 172;

  border-radius: 10;
  background: rgba(
    17,
    17,
    17,
    ${({ isDisabled }) => (isDisabled ? 0.75 : 0.3)}
  );
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 32;
  line-height: 26;
  font-weight: 600;
  padding-top: 4;
  color: #fff;
`;

const LikeButton = styled.TouchableOpacity`
  margin-left: 8;
  margin-right: -16;
  margin-top: -16;

  padding-horizontal: 16;
  padding-vertical: 16;
`;

const Footer = styled.View`
  flex: 1;
  /* justify-content: space-between;
  flex-direction: row; */
  position: absolute;
  bottom: 8;
  left: 16;
`;

const Address = styled.Text`
  font-size: 14;
  font-weight: 400;
  color: #fff;
`;

const DateHelper = styled.Text`
  font-size: 12;
  color: ${p => p.color};
  margin-top: 6;
`;

const IconFutureClock = styled(OrigIconFutureClock)`
  margin-right: 6;
`;

const ImageBackground = styled.ImageBackground`
  border-radius: 10;
  background: rgba(17, 17, 17, 0.6);
`;

const SpecialOffer = styled.View`
  padding-vertical: 16;
  padding-horizontal: 16;
  background: #111;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
`;

const SpecialOfferText = styled.Text`
  color: #7dce56;
  font-size: 12;
`;

function renderSpecialOffer({ item }) {
  const today = new Date();
  const { events = [] } = item;

  if (item.specialOffer || events.length > 0) {
    if (item.specialOffer) {
      return (
        <SpecialOffer>
          <SpecialOfferText>🏷 {item.specialOffer}</SpecialOfferText>
        </SpecialOffer>
      );
    }

    if (events.length > 0) {
      const { title, eventAt } = events[0];

      if (isFuture(eventAt)) {
        return (
          <SpecialOffer>
            <SpecialOfferText>
              🏷{' '}
              {capitalize(
                distanceInWordsStrict(today, eventAt, {
                  locale: ruLocale,
                  addSuffix: true,
                }),
              )}{' '}
              состоится {title}
            </SpecialOfferText>
          </SpecialOffer>
        );
      }

      return null;
    }

    return null;
  }

  return null;
}

function renderTimes({ item }) {
  if (!item.disabled) {
    const today = new Date();
    const todayDayOfWeek = getDay(today);
    const [minHour, maxHour] = item.workingHours[todayDayOfWeek];
    const min = minHour < 10 ? `0${minHour}` : minHour;
    const max = maxHour < 10 ? `0${maxHour}` : maxHour;

    const openingAt = format(today, `YYYY-MM-DD ${min}`);
    const isOpeningInFuture = isFuture(openingAt);

    // const closingAt = format(today, `YYYY-MM-DD ${todayWH[1]}`);
    // const isClosingInFuture = isFuture(closingAt);

    if (isOpeningInFuture) {
      return (
        <DateHelper color="#bd8851">
          <IconFutureClock color="#bd8851" size={12} strokeWidth={4} />
          Откроется{' '}
          {distanceInWordsStrict(today, openingAt, {
            locale: ruLocale,
            addSuffix: true,
          })}{' '}
          в {min}
        </DateHelper>
      );
    }

    return <DateHelper color="#7dce56">Открыто до {max}:00</DateHelper>;
  }

  return null;
}

const cities = {
  moscow: 'Москва',
  yekaterinburg: 'Екатеринбург',
};

export default function Card({ item, onPress: parentOnPress = () => {} }) {
  const [isLiked, toggle] = React.useState(false);

  const title = item.disabled ? `${item.title} — скоро` : item.title;
  const scaleInAnimated = new Animated.Value(0);

  function onPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    if (!item.disabled) parentOnPress();
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      onPressIn={() => animateScale.pressInAnimation(scaleInAnimated)}
      onPressOut={() => animateScale.pressOutAnimation(scaleInAnimated)}
      style={[
        styles.card,
        animateScale.getScaleTransformationStyle(scaleInAnimated),
      ]}
    >
      <ImageBackground
        source={{ uri: `${getPhotoUrl(item.coverId)}-/resize/x512/` }}
        imageStyle={{ borderRadius: 10 }}
      >
        <StCard isDisabled={item.disabled}>
          <Header>
            <Title>{title}</Title>

            {!item.disabled && (
              <LikeButton onPress={() => toggle(!isLiked)}>
                <IconHeart color={isLiked ? '#E74C3C' : '#fff'} />
              </LikeButton>
            )}
          </Header>
          <Footer>
            <Address>
              {cities[item.city]}, {item.addressTitle}
            </Address>

            {renderTimes({ item })}
          </Footer>
        </StCard>

        {renderSpecialOffer({ item })}
      </ImageBackground>
    </TouchableOpacity>
  );
}

import React from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import styled from 'styled-components';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import ruLocale from 'date-fns/locale/ru';
import getDay from 'date-fns/get_day';
import isFuture from 'date-fns/is_future';
import format from 'date-fns/format';
import * as Haptics from 'expo-haptics';
import { Image } from 'react-native-expo-image-cache';
import { elevationShadowStyle } from '../utils/shadow';
import * as animateScale from '../utils/animateScale';
import { getPhotoUrl, onImageLoad } from '../utils/photos';

import {
  // IconHeart,
  // IconFutureClock as OrigIconFutureClock,
  IconStar,
} from '../ui';

const { width: deviceWidth } = Dimensions.get('window');

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
  padding-top: 8;
  padding-bottom: 16;
`;

const Title = styled.Text`
  font-size: 32;
  line-height: 34;
  font-weight: 600;
  margin-bottom: 2;
  color: #fff;
`;

// const LikeButton = styled.TouchableOpacity`
//   margin-left: 8;
//   margin-right: -16;
//   margin-top: -16;

//   padding-horizontal: 16;
//   padding-vertical: 16;
// `;

const Address = styled.Text`
  font-size: 16;
  font-weight: 400;
  color: #fff;
  margin-bottom: 4;
`;

const DateHelper = styled.View`
  background-color: #243829;
  padding-horizontal: 8;
  padding-vertical: 8;
  border-radius: 6;
`;

const TimesText = styled.Text`
  font-size: 14;
  color: #4b9c73;
`;

function renderTimes({ item }) {
  if (!item.disabled) {
    const today = new Date();
    const todayDayOfWeek = getDay(today);
    const { from, to } = item.workingHours[todayDayOfWeek];

    const openingAt = format(today, `YYYY-MM-DD ${from}`);
    const isOpeningInFuture = isFuture(openingAt);

    // const closingAt = format(today, `YYYY-MM-DD ${todayWH[1]}`);
    // const isClosingInFuture = isFuture(closingAt);

    if (isOpeningInFuture) {
      return (
        <DateHelper>
          <TimesText>
            {/* <IconFutureClock color="#bd8851" size={12} strokeWidth={4} /> */}
            Откроется{' '}
            {distanceInWordsStrict(today, openingAt, {
              locale: ruLocale,
              addSuffix: true,
            })}{' '}
            в {from}:00
          </TimesText>
        </DateHelper>
      );
    }

    return (
      <DateHelper>
        <TimesText>Открыто до {to}:00</TimesText>
      </DateHelper>
    );
  }

  return null;
}

const DistanceText = styled.Text`
  color: #c3c3c3;
  font-size: 14;
  margin-bottom: 8;
`;

function renderDistance({ item }) {
  const { address = {} } = item;

  if (address.distance) {
    return <DistanceText>{address.distance} км от вас</DistanceText>;
  }

  return null;
}

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12;
  /* margin-bottom: 12; */
`;

const Rating = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RatingNumber = styled.Text`
  /* margin-top: 4; */
  color: #fff;
  font-weight: bold;
`;

const RatingIcon = styled(IconStar)`
  margin-right: 4;
`;

export default function Card({ item, onPress: parentOnPress = () => {} }) {
  const { address = {} } = item;
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
      <StCard isDisabled={item.disabled}>
        <Title>{title}</Title>

        <Address>
          {address.city}, {address.title}
        </Address>
        {renderDistance({ item })}

        <Image
          resizeMode="cover"
          onLoad={onImageLoad}
          preview={{ uri: `${getPhotoUrl(item.coverId)}-/resize/x48/` }}
          uri={`${getPhotoUrl(item.coverId)}-/resize/x640/`}
          style={{
            borderRadius: 10,
            height: 192,
            width: deviceWidth - 32,
          }}
        />

        <Header>
          <View>{renderTimes({ item })}</View>
          {!item.disabled && (
            <Rating>
              <RatingIcon color="#FECB2E" size={16} />
              <RatingNumber>{parseFloat(item.rating).toFixed(2)}</RatingNumber>
            </Rating>
          )}
        </Header>
      </StCard>
    </TouchableOpacity>
  );
}

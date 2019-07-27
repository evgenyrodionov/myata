import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { withNavigation } from 'react-navigation';
import AnimateNumber from 'react-native-animate-number';
import styled from 'styled-components';
import ruLocale from 'date-fns/locale/ru';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import PassKit, { AddPassButton } from 'react-native-passkit-wallet';
import * as Haptics from 'expo-haptics';
import logoImg from '../images/logo_103.png';
import { elevationShadowStyle } from '../utils/shadow';
import * as animateScale from '../utils/animateScale';

const CardSt = styled.TouchableOpacity`
  background: #000;
  padding-horizontal: 16;
  padding-vertical: 10;
  border-radius: 10;
`;

const styles = StyleSheet.create({
  card: {
    ...elevationShadowStyle({
      elevation: 10,
      shadowColor: '#171717',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowOffsetHeightMultiplier: 0.5,
    }),
  },
});

const CardImage = styled.Image`
  width: 44;
  height: 44;
`;

const CardState = styled.View``;

const CardText = styled.Text`
  text-align: right;
  color: #fff;
`;

const CardBalance = styled(CardText)`
  font-size: 12;
  line-height: 12;
  margin-bottom: 2;
`;

const CardCashback = styled(CardText)`
  font-size: 26;
`;

const CardDescription = styled.Text`
  text-align: center;
  color: #c0c0c0;
  margin-top: 8;
`;

const CardAddPassButton = styled.TouchableOpacity``;

const StAddPassButton = styled(AddPassButton)`
  margin-top: 8;
  height: ${PassKit.AddPassButtonHeight / 1.5};
  width: ${PassKit.AddPassButtonWidth / 1.5};
  align-self: center;
`;

const CardHeader = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const CardFooter = styled.View`
  margin-top: 32;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const CardLastSeenAt = styled.Text`
  font-size: 14;
  color: #eee;
  /* text-align: right; */
`;

function Card({ navigation, user: { visits = [], ...user } }) {
  // const [added, toggle] = React.useState(false);
  const lastVisit = visits[0];
  const scaleInAnimated = new Animated.Value(0);

  function onPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    navigation.navigate('CardDetails', {
      user: { ...user, visits },
    });
  }

  return (
    <>
      <CardSt
        onPress={onPress}
        activeOpacity={1}
        onPressIn={() => animateScale.pressInAnimation(scaleInAnimated)}
        onPressOut={() => animateScale.pressOutAnimation(scaleInAnimated)}
        style={[
          styles.card,
          animateScale.getScaleTransformationStyle(scaleInAnimated),
        ]}
      >
        <CardHeader>
          <CardImage source={logoImg} />

          <CardState>
            <CardBalance>
              <AnimateNumber
                value={user.balance}
                formatter={val => parseInt(val, 10)}
              />{' '}
              баллов
            </CardBalance>
            <CardCashback>{user.cashback}%</CardCashback>
          </CardState>
        </CardHeader>

        {lastVisit && (
          <CardFooter>
            {/* <CardLastSeenAt>
              {JSON.stringify(user.visits, null, 2)}
            </CardLastSeenAt> */}
            <CardLastSeenAt>
              {lastVisit.added ? (
                <>
                  +{lastVisit.added} в Мяте {lastVisit.place.title}
                </>
              ) : (
                <>Мята {lastVisit.place.title}</>
              )}
            </CardLastSeenAt>
            <CardLastSeenAt>
              {distanceInWordsStrict(new Date(), lastVisit.createdAt, {
                addSuffix: true,
                locale: ruLocale,
              })}
            </CardLastSeenAt>
          </CardFooter>
        )}
      </CardSt>

      {/* {added && (
        <CardDescription>Карта добавлена в Apple Wallet (тест)</CardDescription>
      )}
      {!added && (
        <CardAddPassButton>
          <StAddPassButton
            style={{}}
            addPassButtonStyle={PassKit.AddPassButtonStyle.black}
            onPress={() => toggle(true)}
          />
        </CardAddPassButton>
      )} */}
    </>
  );
}

export default withNavigation(Card);

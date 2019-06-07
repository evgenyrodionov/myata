import React from 'react';
import { Dimensions, RefreshControl } from 'react-native';
// import firebase from 'react-native-firebase';
import AnimateNumber from 'react-native-animate-number';
import styled, { css } from 'styled-components';
import ruLocale from 'date-fns/locale/ru';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import PassKit, { AddPassButton } from 'react-native-passkit-wallet';
import logoImg from '../../images/logo_103.png';
import EventCard from '../Places/EventCard';
import { systemEvents } from '../../data';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.ScrollView`
  width: ${deviceWidth};
  padding-horizontal: 16;
  padding-top: 36;
`;

const FeedSt = styled.View`
  margin-top: 56;
`;

const Heading = styled.Text`
  font-size: 36;
  font-weight: bold;
  margin-bottom: 8;
  color: #fff;

  ${p =>
    p.center
    && css`
      text-align: center;
    `}
`;

const CardView = styled.View``;

const Alert = styled.View`
  padding-vertical: 8;
  padding-bottom: 16;
  padding-horizontal: 16;
  border-radius: 10;
  margin-bottom: 16;

  background: rgba(17, 17, 17, 0.3);
`;

const AlertText = styled.Text`
  color: #ccc;
  margin-top: 8;
  font-size: 16;
  text-align: center;
`;

const CardSt = styled.TouchableOpacity`
  background: #000;
  padding-horizontal: 16;
  padding-vertical: 10;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 10;
`;

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

function loadList() {
  return [];
}

function Card() {
  const [added, toggle] = React.useState(false);

  return (
    <>
      <CardSt>
        <CardImage source={logoImg} />

        <CardState>
          <CardBalance>
            <AnimateNumber value={300} formatter={val => parseInt(val, 10)} />{' '}
            баллов
          </CardBalance>
          <CardCashback>3%</CardCashback>
        </CardState>
      </CardSt>

      {added && (
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
      )}
    </>
  );
}

const EventsList = styled.FlatList``;

const EventItem = styled.View`
  margin-bottom: 16;
`;

export default class Feed extends React.Component {
  renderItem = ({ item }, { navigation }) => (
    <EventItem>
      <EventCard
        item={item}
        dateFormat={eventAt =>
          distanceInWordsStrict(new Date(), eventAt, {
            locale: ruLocale,
            addSuffix: true,
          })
        }
        onPress={() => {
          navigation.navigate('PlaceDetails', { id: item.placeId });
        }}
      />
    </EventItem>
  );

  render() {
    const { dispatch = () => ({}), isFetching = false } = this.props;

    const refreshControl = (
      <RefreshControl
        onRefresh={() => dispatch(loadList())}
        enabled={!isFetching}
        // refreshing={isFetching && orders.length !== 0}
        refreshing={isFetching}
      />
    );

    return (
      <View refreshControl={refreshControl}>
        <CardView>
          <Heading>Моя карта</Heading>

          <Card />
        </CardView>

        <FeedSt>
          <Heading>Лента</Heading>

          <Alert>
            <AlertText>
              Добавьте любимые Мяты в избранное и здесь будут их события
            </AlertText>
          </Alert>

          <EventsList
            renderItem={args => this.renderItem(args, this.props)}
            onRefresh={() => dispatch(loadList())}
            refreshing={isFetching}
            data={systemEvents}
            keyExtractor={item => String(item.id)}
          />
        </FeedSt>
      </View>
    );
  }
}

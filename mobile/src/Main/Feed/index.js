import React from 'react';
import { Dimensions, RefreshControl } from 'react-native';
// import firebase from 'react-native-firebase';
import styled, { css } from 'styled-components';
import ruLocale from 'date-fns/locale/ru';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import EventCard from '../Places/EventCard';
import NewsCard from './Card';
import Card from '../../Card/Card';
// import { systemEvents } from '../../data';
import { FooterPusher } from '../../ui';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.ScrollView`
  width: ${deviceWidth};
  padding-horizontal: 16;
  padding-top: 20;
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
    p.center &&
    css`
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

const EventsList = styled.FlatList``;

const EventItem = styled.View`
  margin-bottom: 16;
`;

function loadList() {
  return [];
}

export default class Feed extends React.Component {
  renderItem = ({ item }, { navigation }) => {
    if (item.kind === 'place_event') {
      return (
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
    }

    if (item.kind === 'news') {
      return (
        <EventItem>
          <NewsCard item={item} />
        </EventItem>
      );
    }

    return null;
  };

  render() {
    const {
      dispatch = () => ({}),
      isFetching = false,
      user,
      news,
    } = this.props;

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

          <Card user={user} />
        </CardView>

        <FeedSt>
          <Heading>Лента</Heading>

          <Alert>
            <AlertText>
              Добавьте любимые Мяты в избранное, следите за их новостями в ленте
              и получайте пуш-уведомления
            </AlertText>
          </Alert>

          <EventsList
            renderItem={args => this.renderItem(args, this.props)}
            onRefresh={() => dispatch(loadList())}
            refreshing={isFetching}
            data={news}
            keyExtractor={item => String(item.id)}
          />
        </FeedSt>

        <FooterPusher />
      </View>
    );
  }
}

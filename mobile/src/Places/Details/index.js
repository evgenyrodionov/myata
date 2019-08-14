import React from 'react';
import { Dimensions, FlatList, Linking } from 'react-native';
import styled from 'styled-components';
import getDay from 'date-fns/get_day';
import isFuture from 'date-fns/is_future';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import ruLocale from 'date-fns/locale/ru';
import capitalize from 'capitalize';
import { Image } from 'react-native-expo-image-cache';

import EventCard from '../EventCard';
import Photos from './Photos';

import {
  Title,
  Card,
  ButtonWithIcon,
  IconPhone,
  IconGPS,
  IconWhatsApp,
} from '../../ui';
import { places } from '../../data';
import Address from './Address';
import { getPhotoUrl, onImageLoad } from '../../utils/photos';

const { width: deviceWidth } = Dimensions.get('window');

const Text = styled.Text`
  font-size: 15;
`;

const TimeTableSt = styled.View`
  margin-top: 42;
`;

const TimeTableItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 4;
  flex-basis: 100%;
`;

const TimeTableTitle = styled(Text)`
  color: ${p => p.color || '#9c9c9c'};
  font-weight: 300;
`;

const TimeTableDate = styled(Text)`
  color: ${p => p.color || '#9c9c9c'};
  text-align: right;
  margin-right: 20;
  font-weight: 400;
  margin-right: 0;
`;

const EventCardItem = styled.View`
  width: ${deviceWidth - 16 * 2 - 8};
  margin-right: 6;
`;

const daysOfWeek = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

function renderTimeTableItem({ item, index }) {
  const [min, max] = item;
  const todayDay = getDay(new Date());
  const todayColor = index === todayDay && '#fff';

  return (
    <TimeTableItem>
      <TimeTableTitle color={todayColor}>{daysOfWeek[index]}</TimeTableTitle>
      <TimeTableDate color={todayColor}>
        {min}—{max}
      </TimeTableDate>
    </TimeTableItem>
  );
}

function TimeTable({ workingHours }) {
  return (
    <TimeTableSt>
      <Title>Часы работы</Title>
      <FlatList
        data={workingHours}
        renderItem={renderTimeTableItem}
        keyExtractor={(_, index) => String(index)}
      />
    </TimeTableSt>
  );
}

export const SpecialOffer = styled.View`
  padding-vertical: 16;
  padding-horizontal: 16;
  background: #111;
  margin-horizontal: -16;
  margin-top: 8;
`;

export const SpecialOfferText = styled.Text`
  color: #7dce56;
  font-size: 12;
`;

function renderEventItem({ item }) {
  return (
    <EventCardItem>
      <EventCard item={item} />
    </EventCardItem>
  );
}

function Events({ events }) {
  return (
    <TimeTableSt>
      <Title>Лента</Title>

      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={({ eventAt }) => eventAt}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </TimeTableSt>
  );
}

const ActionsSt = styled.View`
  margin-top: 24;
`;

function Actions({ item }) {
  const [canUseNavi, setCanUseNavi] = React.useState(false);

  const yandexNaviURL = `yandexnavi://map_search?text=Мята ${
    item.addressTitle
  }`;

  React.useEffect(() => {
    Linking.canOpenURL(yandexNaviURL)
      .then(res => setCanUseNavi(res))
      .catch(() => setCanUseNavi(false));
  }, []);

  return (
    <ActionsSt>
      {canUseNavi && (
        <ButtonWithIcon
          icon={<IconGPS color="#eee" size={20} />}
          bgColor="#339274"
          textColor="#eee"
          onPress={() =>
            Linking.openURL(`yandexnavi://map_search?text=${item.addressTitle}`)
          }
        >
          Проложить маршрут
        </ButtonWithIcon>
      )}
      <ButtonWithIcon
        icon={<IconWhatsApp color="#eee" size={20} />}
        bgColor="#191919"
        textColor="#eee"
        onPress={() => Linking.openURL(`https://wa.me/+${item.phoneNumber}`)}
      >
        Написать в WhatsApp
      </ButtonWithIcon>
      <ButtonWithIcon
        icon={<IconPhone color="#eee" size={20} />}
        bgColor="#191919"
        textColor="#eee"
        onPress={() => Linking.openURL(`tel:+${item.phoneNumber}`)}
      >
        Позвонить
      </ButtonWithIcon>
    </ActionsSt>
  );
}

function SocialNetworks({ item: { socialNetworks = {} } }) {
  return (
    <ActionsSt>
      {socialNetworks.instagram && (
        <ButtonWithIcon
          bgColor="#191919"
          textColor="#eee"
          onPress={() =>
            Linking.openURL(`https://instagram.com/${socialNetworks.instagram}`)
          }
        >
          Подписаться в Инстаграм
        </ButtonWithIcon>
      )}

      {socialNetworks.vk && (
        <ButtonWithIcon
          bgColor="#191919"
          textColor="#eee"
          onPress={() => Linking.openURL(`https://vk.com/${socialNetworks.vk}`)}
        >
          Подписаться в ВК
        </ButtonWithIcon>
      )}
    </ActionsSt>
  );
}

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

const HighlightsSt = styled.FlatList`
  margin-left: -16;
  margin-right: -16;
  padding-horizontal: 16;
  margin-top: 24;
`;

const Highlight = styled.TouchableOpacity.attrs({ activeOpacity: 0.9 })`
  margin-right: 12;
  max-width: 168;
`;

const HighlightTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14;
  margin-top: 8;
`;

const hightlightStyle = {
  borderRadius: 10,
  height: 160,
  width: 160,
};

function Highlights({ item }) {
  function renderItem({ item: { title, photoId } }) {
    return (
      <Highlight>
        <Image
          onLoad={onImageLoad}
          style={hightlightStyle}
          // resizeMethod="resize"
          resizeMode="cover"
          preview={{ uri: `${getPhotoUrl(photoId)}-/resize/x48/` }}
          uri={`${getPhotoUrl(photoId)}-/resize/x320/`}
        />

        <HighlightTitle>{title}</HighlightTitle>
      </Highlight>
    );
  }

  return (
    <HighlightsSt
      horizontal
      showsHorizontalScrollIndicator={false}
      data={item.highlights}
      keyExtractor={(_, index) => String(index)}
      renderItem={renderItem}
    />
  );
}

export default function OrderDetails({ navigation }) {
  const id = navigation.getParam('id');
  const item = places.find(place => place.id === id) || navigation.getParam('item', {});
  const { workingHours = [], events = [], photos = [] } = item;

  return (
    <Card onGoBack={() => navigation.goBack()}>
      <Title>{item.title}</Title>

      {renderSpecialOffer({ item })}

      <Address item={item} />

      <Highlights item={item} />

      <Actions item={item} />

      {photos.length > 0 && <Photos photos={photos} />}
      {events.length > 0 && <Events events={events} />}
      {workingHours.length > 0 && <TimeTable workingHours={workingHours} />}

      <SocialNetworks item={item} />
    </Card>
  );
}

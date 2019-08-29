import React from 'react';
import {
  Dimensions, FlatList, Linking, ActionSheetIOS,
} from 'react-native';
import styled from 'styled-components';
import Accordion from 'react-native-collapsible/Accordion';

import getDay from 'date-fns/get_day';
import isFuture from 'date-fns/is_future';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import ruLocale from 'date-fns/locale/ru';

import capitalize from 'capitalize';

import EventCard from '../EventCard';
import Photos from './Photos';

import {
  Title,
  Card,
  ButtonWithIcon,
  IconPhone,
  IconGPS,
  IconWhatsApp,
  IconReservation,
  IconSale,
} from '../../ui';
import { places } from '../../data';
import Address from './Address';
import Highlights from './Highlights';

const { width: deviceWidth } = Dimensions.get('window');

const Text = styled.Text`
  font-size: 15;
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

const TimeTableSt = styled.View`
  margin-top: 42;
`;

const TimeTableItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 6;
  flex-basis: 100%;
  margin-horizontal: -8;
  padding-horizontal: 8;
`;

const TimeTableTitle = styled(Text)`
  color: ${p => p.color || '#9c9c9c'};
  font-weight: 300;
`;

const TimeTableRight = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TimeTableDate = styled(Text)`
  color: ${p => p.color || '#9c9c9c'};
  text-align: right;
  margin-right: 20;
  font-weight: 400;
  margin-right: 0;
  margin-left: 6;
`;

const EventCardItem = styled.View`
  width: ${deviceWidth - 16 * 2 - 8};
  margin-right: 6;
`;

const SalesSt = styled.FlatList``;

const SaleRowSeparator = styled.View`
  height: 1;
  background-color: rgba(200, 200, 200, 0.1);
`;

const SaleRow = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  padding-vertical: 10;
  max-width: ${deviceWidth - 16 * 2};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SaleRowDescription = styled.View``;

const SaleRowText = styled.Text`
  font-size: 14;
  font-weight: bold;
  flex-wrap: wrap;
  color: #7dce56;
`;

const SaleRowTime = styled.Text`
  font-size: 14;
  color: #ccc;
  margin-top: 4;
`;

function renderTimeTableItem({ workingHours, sales }, index, isActive) {
  const [minHour, maxHour] = workingHours;
  const todayDay = getDay(new Date());
  const todayColor = (isActive || index === todayDay) && '#fff';
  const min = minHour < 10 ? `0${minHour}` : minHour;
  const max = maxHour < 10 ? `0${maxHour}` : maxHour;

  return (
    <TimeTableItem>
      <TimeTableTitle color={todayColor}>{daysOfWeek[index]}</TimeTableTitle>
      <TimeTableRight>
        {sales.length > 0 && !isActive && (
          <IconSale color="#7dce56" size={16} />
        )}
        <TimeTableDate color={todayColor}>
          {min}:00—{max}:00
        </TimeTableDate>
      </TimeTableRight>
    </TimeTableItem>
  );
}

function renderSale({ item }) {
  const hasTimeLimit = item.hourFrom;
  const isAllDay = item.allDay;

  return (
    <SaleRow>
      <SaleRowDescription>
        <SaleRowText>{item.title}</SaleRowText>

        {isAllDay && <SaleRowTime>Акция дня</SaleRowTime>}
        {hasTimeLimit && (
          <SaleRowTime>
            С {item.hourFrom}:00 до {item.hourTo}:00
          </SaleRowTime>
        )}
      </SaleRowDescription>

      <IconSale color="#7dce56" size={24} />
    </SaleRow>
  );
}

function Sales({ sales }) {
  return (
    <SalesSt
      data={sales}
      renderItem={renderSale}
      ItemSeparatorComponent={SaleRowSeparator}
      keyExtractor={({ title }) => title}
    />
  );
}

function TimeTable({ workingHours, sales }) {
  const today = new Date();
  const todayDay = getDay(today);
  const [activeSections, updateActiveSections] = React.useState([todayDay]);
  const combinedSalesAndWH = workingHours.map((item, index) => ({
    workingHours: item,
    sales: sales[index],
  }));

  return (
    <TimeTableSt>
      <Title>Часы работы</Title>

      <Accordion
        underlayColor="transparent"
        activeSections={activeSections}
        sections={combinedSalesAndWH}
        renderHeader={renderTimeTableItem}
        renderContent={({ sales: contentSales }) => (
          <Sales sales={contentSales} />
        )}
        onChange={updateActiveSections}
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

function Actions({ navigation, item: place }) {
  const [canUseNavi, setCanUseNavi] = React.useState(false);

  const yandexNaviURL = `yandexnavi://map_search?text=Мята ${
    place.addressTitle
  }`;

  React.useEffect(() => {
    Linking.canOpenURL(yandexNaviURL)
      .then(res => setCanUseNavi(res))
      .catch(() => setCanUseNavi(false));
  }, []);

  function onContact() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Позвонить в заведение', 'Написать администратору', 'Отмена'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          return Linking.openURL(`tel:${place.phoneNumber}`);
        }

        if (buttonIndex === 1) {
          return Linking.openURL(`https://wa.me/${place.phoneNumber}`);
        }

        return null;
      },
    );
  }

  return (
    <ActionsSt>
      {canUseNavi && (
        <ButtonWithIcon
          icon={<IconGPS color="#eee" size={20} />}
          bgColor="#339274"
          textColor="#eee"
          onPress={() =>
            Linking.openURL(
              `yandexnavi://map_search?text=${place.addressTitle}`,
            )
          }
        >
          Проложить маршрут
        </ButtonWithIcon>
      )}
      <ButtonWithIcon
        icon={<IconReservation color="#eee" size={20} />}
        bgColor="#191919"
        textColor="#eee"
        onPress={() => navigation.navigate('PlaceReservation', { place })}
      >
        Забронировать стол
      </ButtonWithIcon>
      <ButtonWithIcon
        icon={<IconPhone color="#eee" size={20} />}
        bgColor="#191919"
        textColor="#eee"
        onPress={onContact}
      >
        Связаться
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

export default function OrderDetails({ navigation }) {
  const id = navigation.getParam('id');
  const item = places.find(place => place.id === id) || navigation.getParam('item', {});
  const {
    workingHours = [],
    events = [],
    photoIds = [],
    sales = [],
    // generalSales,
  } = item;

  return (
    <Card onGoBack={() => navigation.goBack()}>
      <Title>{item.title}</Title>

      {/* {renderSpecialOffer({ item })} */}

      <Address item={item} />
      <Actions item={item} navigation={navigation} />
      <Highlights item={item} />
      <TimeTable sales={sales} workingHours={workingHours} />

      {photoIds.length > 0 && <Photos photoIds={photoIds} />}
      {events.length > 0 && <Events events={events} />}

      <SocialNetworks item={item} />
    </Card>
  );
}

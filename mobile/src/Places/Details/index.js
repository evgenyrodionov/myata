import React from 'react';
import { Dimensions, FlatList, Linking } from 'react-native';
import styled from 'styled-components';
import Accordion from 'react-native-collapsible/Accordion';

import getDay from 'date-fns/get_day';
import getHours from 'date-fns/get_hours';
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

const SalesSt = styled.FlatList``;

const SaleRowSeparator = styled.View`
  height: 1;
  background-color: rgba(200, 200, 200, 0.1);
`;

const SaleRow = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  padding-vertical: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SaleRowText = styled.Text`
  font-size: 14;
  font-weight: bold;
  color: #7dce56;
`;

const SaleRowTime = styled.Text`
  font-size: 14;
  color: #ccc;
  margin-top: 4;
`;

function renderTimeTableItem({ workingHours }, index, isActive) {
  const [minHour, maxHour] = workingHours;
  const todayDay = getDay(new Date());
  const todayColor = (isActive || index === todayDay) && '#fff';
  const min = minHour < 10 ? `0${minHour}` : minHour;
  const max = maxHour < 10 ? `0${maxHour}` : maxHour;

  return (
    <TimeTableItem>
      <TimeTableTitle color={todayColor}>{daysOfWeek[index]}</TimeTableTitle>
      <TimeTableDate color={todayColor}>
        {min}:00—{max}:00
      </TimeTableDate>
    </TimeTableItem>
  );
}

function renderSale({ item }) {
  const today = new Date();
  const currentHour = getHours(today);
  const isActive = item.general
    || item.allDay
    || (currentHour >= item.hourFrom && currentHour <= item.hourTo);
  const hasTimeLimit = item.hourFrom;

  return (
    <SaleRow isActive={isActive}>
      <SaleRowText isActive={isActive}>{item.title}</SaleRowText>
      {hasTimeLimit && (
        <SaleRowTime>
          С {item.hourFrom}:00 до {item.hourTo}:00
        </SaleRowTime>
      )}
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

      {renderSpecialOffer({ item })}

      <Address item={item} />

      <Actions item={item} />

      <Highlights item={item} />

      {workingHours.length > 0 && (
        <TimeTable sales={sales} workingHours={workingHours} />
      )}

      {photoIds.length > 0 && <Photos photoIds={photoIds} />}
      {events.length > 0 && <Events events={events} />}

      <SocialNetworks item={item} />
    </Card>
  );
}

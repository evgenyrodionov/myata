import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import getDay from 'date-fns/get_day';
import { FlatList } from 'react-native-gesture-handler';
import EventCard from './EventCard';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.ScrollView`
  padding-top: 100;
  padding-horizontal: 16;
  background-color: #171717;
`;

const Text = styled.Text`
  font-size: 15;
`;

const DateLabel = styled(Text)`
  color: #fff;
  margin-top: 22;
`;

export const Title = styled.Text`
  font-size: 34;
  line-height: 36;
  font-weight: 700;
  color: #fff;
`;

const Title2 = styled.Text`
  font-size: 24;
  line-height: 26;
  font-weight: 600;
  margin-bottom: 16;
  margin-top: 42;
  color: #fff;
`;

const TimeTableSt = styled.View`
  margin-top: 20;
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
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

function renderTimeTableItem({ item, index }) {
  const [min, max] = item;
  const todayDay = getDay(new Date());
  const todayColor = index === todayDay - 1 && '#fff';

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
      <Title2>Часы работы</Title2>
      <FlatList
        data={workingHours}
        renderItem={renderTimeTableItem}
        keyExtractor={(_, index) => String(index)}
      />
    </TimeTableSt>
  );
}

// const DetailsSt = styled.View``;

// const Dl = styled.View`
//   margin-bottom: 16;
// `;

// const Dt = styled.Text`
//   font-size: 15;
//   color: #9c9c9c;
//   margin-bottom: 2;
// `;

// const Dd = styled.Text`
//   font-size: 16;
//   color: #3a3a3a;
// `;

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
      <Title2>Лента</Title2>

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

export default function OrderDetails({ navigation }) {
  const item = navigation.getParam('item', {});
  const { workingHours = [], events = [] } = item;

  return (
    <View>
      <Title>{item.title}</Title>

      {item.specialOffer && (
        <SpecialOffer>
          <SpecialOfferText>{item.specialOffer}</SpecialOfferText>
        </SpecialOffer>
      )}

      <DateLabel>{item.addressTitle}</DateLabel>

      <TimeTable workingHours={workingHours} />

      {events.length > 0 && <Events events={events} />}
    </View>
  );
}

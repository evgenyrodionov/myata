import React from 'react';
import {
  Dimensions, FlatList, Linking, ActionSheetIOS,
} from 'react-native';
import styled from 'styled-components';
import Accordion from 'react-native-collapsible/Accordion';
import fb from 'react-native-firebase';
import useStoreon from 'storeon/react';

import getDay from 'date-fns/get_day';

import EventCard from '../EventCard';
import Photos from './Photos';

import {
  Title,
  Card,
  ButtonWithIcon,
  GradientButtonWithIcon,
  IconPhone,
  IconReservation,
  IconSale,
  IconStar,
  IconMenu,
  IconHeart,
  IconHeartFilled,
  IconMapWithMarker,
  colorsToGradient,
} from '../../ui';
import Address from './Address';
import Highlights from './Highlights';
import Reviews from './Reviews';

const db = fb.firestore();
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

const kindToColor = {
  default: '#20b4ab',
  edition: '#e79f6d',
  platinum: '#ffffff',
};

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

function renderTimeTableItem({ workingHours, sales = [] }, index, isActive) {
  const { from, to } = workingHours;
  const todayDay = getDay(new Date());
  const todayColor = (isActive || index === todayDay) && '#fff';
  const isDisabled = !workingHours;

  return (
    <TimeTableItem>
      <TimeTableTitle color={todayColor}>{daysOfWeek[index]}</TimeTableTitle>
      <TimeTableRight>
        {sales.length > 0 && !isActive && (
          <IconSale color="#7dce56" size={16} />
        )}
        {!isDisabled && (
          <TimeTableDate color={todayColor}>
            {from}:00—{to}:00
          </TimeTableDate>
        )}
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

const ActionsBlock = styled.View`
  margin-bottom: 14;
`;

function Actions({ navigation, item: place = {} }) {
  const { user } = useStoreon('user');
  const [canUseNavi, setCanUseNavi] = React.useState(false);
  const { address = {} } = place;

  const { favorites = [] } = user;
  const isFavorite = favorites.includes(place.id);

  const yandexNaviURL = `yandexnavi://map_search?text=Мята ${address.title}`;

  const primaryColor = kindToColor[place.kind];

  const favoriteButtonTextColor = primaryColor === kindToColor.platinum ? '#191919' : '#eee';

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

  function onNavigation() {
    const options = canUseNavi
      ? ['Проложить маршрут', 'Посмотреть на карте', 'Отмена']
      : ['Посмотреть на карте', 'Отмена'];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (canUseNavi) {
          if (buttonIndex === 0) {
            return Linking.openURL(yandexNaviURL);
          }

          if (buttonIndex === 1) {
            return navigation.navigate('PlacesMap', {
              initial: {
                latitude: address.lat,
                longitude: address.lon,
              },
            });
          }

          return null;
        }

        if (buttonIndex === 0) {
          return navigation.navigate('PlacesMap', {
            initial: {
              latitude: address.lat,
              longitude: address.lon,
            },
          });
        }

        return null;
      },
    );
  }

  function onFavoritePress() {
    if (isFavorite) {
      return db
        .collection('users')
        .doc(user.id)
        .update({ favorites: fb.firestore.FieldValue.arrayRemove(place.id) });
    }

    return db
      .collection('users')
      .doc(user.id)
      .update({ favorites: fb.firestore.FieldValue.arrayUnion(place.id) });
  }

  return (
    <ActionsSt>
      <ActionsBlock>
        <GradientButtonWithIcon
          icon={
            isFavorite ? (
              <IconHeartFilled color={favoriteButtonTextColor} size={20} />
            ) : (
              <IconHeart color={favoriteButtonTextColor} size={20} />
            )
          }
          colors={
            colorsToGradient[primaryColor]
            || colorsToGradient[kindToColor.default]
          }
          textColor={favoriteButtonTextColor}
          onPress={onFavoritePress}
        >
          {!isFavorite ? <>Добавить в избранное</> : <>Удалить из избранного</>}
        </GradientButtonWithIcon>
      </ActionsBlock>
      <ActionsBlock>
        <ButtonWithIcon
          icon={<IconMapWithMarker color="#eee" size={20} />}
          bgColor="#191919"
          textColor="#eee"
          onPress={onNavigation}
        >
          Навигация
        </ButtonWithIcon>
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
      </ActionsBlock>
      {place.products.length > 0 && (
        <ButtonWithIcon
          icon={<IconMenu color="#eee" size={20} />}
          bgColor="#191919"
          textColor="#eee"
          onPress={() =>
            navigation.navigate('PlaceMenu', { placeId: place.id })
          }
        >
          Посмотреть меню
        </ButtonWithIcon>
      )}
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

const ReviewsWrapper = styled.View`
  margin-top: 42;
  margin-bottom: 24;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Rating = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RatingNumber = styled.Text`
  margin-top: 4;
  color: #fff;
  font-weight: bold;
`;
const RatingIcon = styled(IconStar)`
  margin-right: 4;
`;

export default function PlaceDetals({ navigation }) {
  const { placesById = {} } = useStoreon('placesById');
  const id = navigation.getParam('id');
  const item = placesById[id] || {};
  const { user = {} } = useStoreon('places', 'orderBy', 'user');

  const { favorites = [] } = user;
  const isFavorite = favorites.includes(id);

  const {
    workingHours = [],
    events = [],
    photoIds = [],
    sales = [],
    // generalSales,
  } = item;

  return (
    <Card onGoBack={navigation.goBack}>
      <Header>
        <Title>
          {item.title}
          {/* <IconHeart color="#eee" size={36} /> */}
        </Title>
        {item.rating && (
          <Rating>
            <RatingIcon color="#FECB2E" size={16} />
            <RatingNumber>{item.rating}</RatingNumber>
          </Rating>
        )}
      </Header>

      {/* {renderSpecialOffer({ item })} */}

      <Address item={item} />
      <Actions item={item} navigation={navigation} />
      <Highlights item={item} />

      <TimeTable sales={sales} workingHours={workingHours} />

      {photoIds.length > 0 && <Photos photoIds={photoIds} />}
      {events.length > 0 && <Events events={events} />}

      <ReviewsWrapper>
        <Reviews item={item} navigation={navigation} user={user} />
      </ReviewsWrapper>
      <SocialNetworks item={item} />
    </Card>
  );
}

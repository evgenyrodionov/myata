import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Permissions } from 'react-native-unimodules';
import * as Haptics from 'expo-haptics';

import { createStackNavigator } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { IconProfile, IconFeed, IconMap } from '../ui';

import Feed from '../Feed';
import Profile from '../Profile';
import ProfileEdit from '../Profile/Edit';
import Places from '../Places';
import PlaceDetails from '../Places/Details';
import PlaceReservation from '../Places/Details/Reservation';
import CardDetails from '../Card/Details';

import {
  mapUser,
  mapPermissionsToBoolean,
  mapPhoneNumberToId,
} from '../Profile/mappers';
import {
  getCurrentUser,
  getRef as getUserRef,
  updateByKey as updateUserByKey,
} from '../Profile/api';

import { mapNews } from '../Feed/mappers';
import { getRef as getNewsRef } from '../Feed/api';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.SafeAreaView`
  flex: 1;
  background-color: #191919;
`;

const ScrollView = styled.ScrollView`
  margin-top: 48;
`;

const HeaderWrapper = styled.View`
  position: absolute;
  top: ${isIphoneX() ? 48 + 12 : 48 - 12};
  width: ${deviceWidth};
`;

const Header = styled.View`
  margin-horizontal: 16;
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;

const HeaderButton = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })``;

function Main(props) {
  const [user, setUser] = React.useState({});
  const [news, setNews] = React.useState([]);
  const [ref, setRef] = React.useState(null);
  const [isLoading, updateLoading] = React.useState(true);
  const [screenOffset, updateStateOffset] = React.useState(1);
  const currentUser = getCurrentUser();

  const userId = mapPhoneNumberToId(currentUser.phoneNumber);

  function updateOffset(offset) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    updateStateOffset(offset);
  }

  function onMomentumScrollEnd(e) {
    const offset = e.nativeEvent.contentOffset;

    if (offset) {
      const page = Math.round(offset.x / deviceWidth);

      if (Number(screenOffset) !== Number(page)) {
        updateOffset(page);
      }
    }
  }

  // update settings
  React.useEffect(() => {
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) =>
      updateUserByKey(
        userId,
        'settings.notifications',
        mapPermissionsToBoolean[status] || false,
      ));
  }, []);

  // listen to user updates
  React.useEffect(() => {
    getUserRef(userId).onSnapshot(async doc => setUser(await mapUser(doc)));
  }, []);

  // listen to news updates
  React.useEffect(() => {
    getNewsRef()
      .orderBy('eventAt', 'desc')
      .onSnapshot(docs => setNews(mapNews(docs)));
  }, []);

  // callback after initial user loading
  React.useEffect(() => {
    updateLoading(false);
  }, [user]);

  function scrollTo(offset) {
    ref.scrollTo({ x: deviceWidth * offset, animated: true });
  }

  function getColor(offset) {
    return screenOffset === offset ? '#fff' : 'rgba(255, 255, 255, 0.3)';
  }

  if (!isLoading) {
    return (
      <View>
        <HeaderWrapper>
          <Header blurType="extraDark">
            <HeaderButton onPress={() => scrollTo(0)}>
              <IconProfile color={getColor(0)} />
            </HeaderButton>
            <HeaderButton onPress={() => scrollTo(1)}>
              <IconFeed color={getColor(1)} />
            </HeaderButton>
            <HeaderButton onPress={() => scrollTo(2)}>
              <IconMap color={getColor(2)} />
            </HeaderButton>
          </Header>
        </HeaderWrapper>

        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: deviceWidth * screenOffset }}
          onMomentumScrollEnd={onMomentumScrollEnd}
          ref={el => setRef(el)}
        >
          <Profile user={user} {...props} />
          <Feed user={user} news={news} {...props} />
          <Places user={user} {...props} />
        </ScrollView>
      </View>
    );
  }

  return <View />;
}

export default createStackNavigator(
  {
    Main,
    PlaceDetails: {
      screen: PlaceDetails,
    },
    PlaceReservation: {
      screen: PlaceReservation,
    },
    CardDetails: {
      screen: CardDetails,
    },
    ProfileEdit: {
      screen: ProfileEdit,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
  },
);

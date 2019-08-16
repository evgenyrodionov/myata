import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Permissions } from 'react-native-unimodules';
import * as Haptics from 'expo-haptics';

import { createStackNavigator } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';
import {
  HeaderButton, IconProfile, IconFeed, IconMap,
} from '../ui';

import Feed from '../Feed';
import Profile from '../Profile';
import ProfileEdit from '../Profile/Edit';
import Places from '../Places';
import PlaceDetails from '../Places/Details';
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
  padding-top: 48;
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

function Main(props) {
  const [user, setUser] = React.useState({});
  const [news, setNews] = React.useState([]);
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
    getNewsRef().onSnapshot(docs => setNews(mapNews(docs)));
  }, []);

  // callback after initial user loading
  React.useEffect(() => {
    updateLoading(false);
  }, [user]);

  if (!isLoading) {
    return (
      <View>
        <HeaderWrapper>
          <Header blurType="extraDark">
            <HeaderButton isActive={screenOffset === 0}>
              <IconProfile />
            </HeaderButton>
            <HeaderButton isActive={screenOffset === 1}>
              <IconFeed />
            </HeaderButton>
            <HeaderButton isActive={screenOffset === 2}>
              <IconMap />
            </HeaderButton>
          </Header>
        </HeaderWrapper>

        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: deviceWidth * screenOffset }}
          onMomentumScrollEnd={onMomentumScrollEnd}
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

import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Permissions } from 'react-native-unimodules';
import * as Haptics from 'expo-haptics';
import firebase from 'react-native-firebase';
import useStoreon from 'storeon/react';

import { createStackNavigator } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { IconProfile, IconFeed, IconMap } from '../ui';

import Feed from '../Feed';
import Profile from '../Profile';
import ProfileEdit from '../Profile/Edit';
import Places from '../Places';
import PlaceDetails from '../Places/Details';
import PlaceReservation from '../Places/Details/Reservation';
import PlaceNewReview from '../Places/Details/Reviews/Details';
import PlaceMenu from '../Places/Details/Menu';
import PlacesMap from '../Places/Map';
import CardDetails from '../Card/Details';
import SplashScreen from '../SplashScreen';

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

import {
  mapDocs as mapPlaces,
  getCollectionRef as getPlacesRef,
  keyById as keyPlacesById,
} from '../Places/api';

const { width: deviceWidth } = Dimensions.get('window');
const headerSize = 38;

const View = styled.View`
  flex: 1;
  background-color: #191919;
`;

const ScrollView = styled.ScrollView`
  margin-top: ${isIphoneX() ? headerSize * 2 : headerSize * 1.5};
`;

const Header = styled.View`
  z-index: 10000;
  position: absolute;
  top: ${isIphoneX() ? headerSize : headerSize - 12};
  width: ${deviceWidth};
  background-color: #191919;
  padding-bottom: 4;
  padding-horizontal: 16;
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;

const HeaderButton = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  padding-vertical: 8;
  padding-horizontal: 8;
`;

const HeaderButtonLeft = styled(HeaderButton)`
  padding-left: 0;
`;

const HeaderButtonRight = styled(HeaderButton)`
  padding-right: 0;
`;

function Main(props) {
  const [user, setUser] = React.useState({});
  const [news, setNews] = React.useState([]);
  const [isLoading, updateLoading] = React.useState(true);
  const [isPlacesLoading, setPlacesLoading] = React.useState(true);
  const [screenOffset, updateStateOffset] = React.useState(1);
  const { dispatch } = useStoreon();

  const ref = React.useRef(null);
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
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
      updateUserByKey(
        userId,
        'settings.notifications',
        mapPermissionsToBoolean[status] || false,
      );
    });

    Permissions.askAsync(Permissions.LOCATION).then(async ({ status }) => {
      if (status === 'granted') {
        try {
          const { coords } = await Location.getCurrentPositionAsync({});

          dispatch('user/setLocation', {
            lat: coords.latitude,
            lon: coords.longitude,
          });
        } catch (e) {
          //
        }
      }
    });

    firebase
      .messaging()
      .getToken()
      .then((token) => {
        updateUserByKey(
          userId,
          'tokens',
          firebase.firestore.FieldValue.arrayUnion(token),
        );
      });
  }, []);

  // listen to user updates
  React.useEffect(() => {
    const userRef = getUserRef(userId);

    userRef.onSnapshot(async (doc) => {
      const mappedUser = await mapUser(doc, userRef);

      setUser(mappedUser);
      dispatch('user/update', mappedUser);

      updateLoading(false);
    });
  }, []);

  // listen to news updates
  React.useEffect(() => {
    getNewsRef()
      .orderBy('eventAt', 'desc')
      .onSnapshot(docs => setNews(mapNews(docs)));
  }, []);

  // listen to places updates
  React.useEffect(() => {
    getPlacesRef()
      .where('visible', '==', true)
      .onSnapshot(async (docs) => {
        const mapped = await mapPlaces(docs);
        const placesById = keyPlacesById(mapped);

        dispatch('places/update', { places: mapped, placesById });
        setPlacesLoading(false);
      });
  }, []);

  function scrollTo(offset) {
    ref.current.scrollTo({ x: deviceWidth * offset, animated: true });
  }

  function getColor(offset) {
    return screenOffset === offset ? '#fff' : 'rgba(255, 255, 255, 0.3)';
  }

  if (!isLoading) {
    return (
      <View>
        <Header>
          <HeaderButtonLeft onPress={() => scrollTo(0)}>
            <IconProfile color={getColor(0)} />
          </HeaderButtonLeft>
          <HeaderButton onPress={() => scrollTo(1)}>
            <IconFeed color={getColor(1)} />
          </HeaderButton>
          <HeaderButtonRight onPress={() => scrollTo(2)}>
            <IconMap color={getColor(2)} />
          </HeaderButtonRight>
        </Header>

        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: deviceWidth * screenOffset }}
          onMomentumScrollEnd={onMomentumScrollEnd}
          ref={ref}
        >
          <Profile user={user} {...props} />
          <Feed news={news} {...props} />
          <Places isLoading={isPlacesLoading} user={user} {...props} />
        </ScrollView>
      </View>
    );
  }

  return <SplashScreen />;
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
    PlaceNewReview: {
      screen: PlaceNewReview,
    },
    PlaceMenu: {
      screen: PlaceMenu,
    },
    PlacesMap: {
      screen: PlacesMap,
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

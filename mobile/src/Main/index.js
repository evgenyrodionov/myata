import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import firebase from 'react-native-firebase';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import * as Haptics from 'expo-haptics';

import parse from 'date-fns/parse';

import { createStackNavigator } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { HeaderButton, IconProfile, IconFeed, IconMap } from '../ui';

import Places from './Places';
import PlaceDetails from './Places/Details';
import CardDetails from '../Card/Details';

import Feed from './Feed';
import Profile from './Profile';

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

// const Header = styled(BlurView)`
const Header = styled.View`
  margin-horizontal: 16;
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;

const firestore = firebase.firestore();

// const Text = styled.Text``;
// const TouchableOpacity = styled.TouchableOpacity``;

async function mapUser(doc) {
  const data = doc.data();
  const phoneNumber = doc.id;

  const formattedPhoneNumber = parsePhoneNumberFromString(
    String(`+${phoneNumber}`),
  ).formatInternational();

  const visits = await Promise.all(
    (data.visits || []).map(async ({ placeRef, ...visit }) => {
      const place = await placeRef.get();

      return {
        ...visit,
        createdAt: parse(visit.createdAt.seconds * 1000),
        place: {
          ...place.data(),
          id: place.id,
        },
      };
    }),
  );

  const friends = await Promise.all(
    (data.friends || []).map(async friendRef => {
      const friend = await friendRef.get();

      return {
        id: friend.id,
        ...friend.data(),
      };
    }),
  );

  return {
    ...data,
    formattedPhoneNumber,
    visits,
    friends,
  };
}

function mapNews(docs) {
  const mappedDocs = [];

  docs.forEach(doc => mappedDocs.push({ id: doc.id, ...doc.data() }));

  return mappedDocs;
}

function Main(props) {
  const [user, setUser] = React.useState({});
  const [news, setNews] = React.useState([]);
  const [isLoading, updateLoading] = React.useState(true);
  const [screenOffset, updateScreenOffset] = React.useState(1);
  const { currentUser } = firebase.auth();

  const phoneNumber = currentUser.phoneNumber.replace(/\+/, '');

  React.useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }, [screenOffset]);

  React.useEffect(() => {
    updateLoading(false);
  }, [user]);

  React.useEffect(() => {
    firestore
      .collection('users')
      .doc(phoneNumber)
      .onSnapshot(async doc => {
        const fbUser = await mapUser(doc);

        return setUser(fbUser);
      });
  }, []);

  React.useEffect(() => {
    firestore.collection('news').onSnapshot(docs => setNews(mapNews(docs)));
  }, []);

  if (!isLoading) {
    return (
      <View>
        <HeaderWrapper>
          <Header blurType="extraDark">
            <HeaderButton
              isActive={screenOffset === 0}
              onPress={() => updateScreenOffset(0)}
            >
              <IconProfile />
            </HeaderButton>
            <HeaderButton
              isActive={screenOffset === 1}
              onPress={() => updateScreenOffset(1)}
            >
              <IconFeed />
            </HeaderButton>
            <HeaderButton
              isActive={screenOffset === 2}
              onPress={() => updateScreenOffset(2)}
            >
              <IconMap />
            </HeaderButton>
          </Header>
        </HeaderWrapper>

        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: deviceWidth * screenOffset }}
          onMomentumScrollEnd={e => {
            const offset = e.nativeEvent.contentOffset;

            if (offset) {
              const page = Math.round(offset.x / deviceWidth);

              if (Number(screenOffset) !== Number(page)) {
                updateScreenOffset(page);
              }
            }
          }}
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
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
  },
);

import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import firebase from 'react-native-firebase';

import parse from 'date-fns/parse';

import { createStackNavigator, Header as RNHeader } from 'react-navigation';
import { BlurView } from '@react-native-community/blur';
import { HeaderButton } from '../ui';

import Places from './Places';
import PlaceDetails from './Places/Details';

import Feed from './Feed';
import Profile from './Profile';

const { width: deviceWidth } = Dimensions.get('window');

const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: #191919;
  padding-top: ${RNHeader.HEIGHT + 25};
`;

const startScreenOffset = 1;
const contentOffset = { x: deviceWidth * startScreenOffset };

const firestore = firebase.firestore();

function Main(props) {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    // const { currentUser } = firebase.auth();
    // const phoneNumber = currentUser.phoneNumber.replace(/\+/, '');
    const phoneNumber = '79998214142';

    firestore
      .collection('users')
      .doc(phoneNumber)
      .get()
      .then(async (doc) => {
        const data = doc.data();

        const visits = await Promise.all(
          data.visits.map(async ({ placeRef, ...visit }) => {
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
          data.friends.map(async (friendRef) => {
            const friend = await friendRef.get();

            return {
              id: friend.id,
              ...friend.data(),
            };
          }),
        );

        const mapped = {
          ...data,
          visits,
          friends,
        };

        setUser(mapped);
      });
  }, []);

  return (
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      contentOffset={contentOffset}
    >
      <Profile user={user} {...props} />
      <Feed user={user} {...props} />
      <Places {...props} />
    </ScrollView>
  );
}

export default createStackNavigator(
  {
    Main,
    PlaceDetails: {
      screen: PlaceDetails,
      navigationOptions: {
        headerLeft: null,
        headerTitle: <HeaderButton>↓</HeaderButton>,
        headerRight: null,
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    defaultNavigationOptions: {
      headerBackground: <BlurView blurType="extraDark" style={{ flex: 1 }} />,
      headerTransparent: true,
      headerLeft: <HeaderButton>👱🏻‍♂️</HeaderButton>,
      headerTitle: <HeaderButton>📰</HeaderButton>,
      headerRight: <HeaderButton>🏛</HeaderButton>,
    },
  },
);

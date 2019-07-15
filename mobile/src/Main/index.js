import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import firebase from 'react-native-firebase';

import parse from 'date-fns/parse';

import { createStackNavigator, Header as RNHeader } from 'react-navigation';
// import { BlurView } from '@react-native-community/blur';
import {
  HeaderButton, IconProfile, IconFeed, IconMap,
} from '../ui';

import Places from './Places';
import PlaceDetails from './Places/Details';

import Feed from './Feed';
import Profile from './Profile';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.View`
  flex: 1;
  background-color: #191919;
`;

const ScrollView = styled.ScrollView`
  padding-top: ${RNHeader.HEIGHT + 25};
`;

const HeaderWrapper = styled.View`
  position: absolute;
  top: ${RNHeader.HEIGHT};
  height: ${RNHeader.HEIGHT};
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

function Main(props) {
  const [user, setUser] = React.useState({});
  const [screenOffset, updateScreenOffset] = React.useState(2);

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
        onMomentumScrollEnd={e =>
          updateScreenOffset(e.nativeEvent.contentOffset.x / deviceWidth)
        }
      >
        <Profile user={user} {...props} />
        <Feed user={user} {...props} />
        <Places {...props} />
      </ScrollView>
    </View>
  );
}

export default createStackNavigator(
  {
    Main,
    PlaceDetails: {
      screen: PlaceDetails,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
  },
);

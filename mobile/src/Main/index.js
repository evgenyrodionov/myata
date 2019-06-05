import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

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

function Main(props) {
  return (
    <ScrollView
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      contentOffset={contentOffset}
    >
      <Profile {...props} />
      <Feed {...props} />
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
      headerLeft: <HeaderButton>Профиль</HeaderButton>,
      headerTitle: <HeaderButton>Лента</HeaderButton>,
      headerRight: <HeaderButton>Заведения</HeaderButton>,
    },
  },
);

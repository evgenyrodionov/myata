import React from 'react';
import firebase from 'react-native-firebase';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import codePush from 'react-native-code-push';

import Main from './Main';
import Auth from './Auth';

function AuthChecker(props) {
  React.useEffect(() => {
    const { currentUser } = firebase.auth();

    props.navigation.navigate(currentUser && currentUser.uid ? 'Main' : 'Auth');
  }, []);

  return null;
}

const rootNavigator = createSwitchNavigator(
  {
    Main,
    Auth,
    AuthChecker,
  },
  {
    initialRouteName: 'AuthChecker',
  },
);

function App() {
  const Layout = createAppContainer(rootNavigator);

  return <Layout />;
}

export default codePush(App);

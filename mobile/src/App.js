import React from 'react';
import * as Sentry from '@sentry/react-native';
import firebase from 'react-native-firebase';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import codePush from 'react-native-code-push';
import StoreContext from 'storeon/react/context';

import Main from './Main';
import Auth from './Auth';

import store from './store';

Sentry.init({
  dsn: 'https://6d1070e8344447adb36e6d7d5dd09376@sentry.io/1802365',
});

function AuthChecker(props) {
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      props.navigation.navigate(user && user.uid ? 'Main' : 'Auth');
    });

    return unsubscribe;
  }, []);

  React.useEffect(() => {
    const { currentUser: user } = firebase.auth();

    props.navigation.navigate(user && user.uid ? 'Main' : 'Auth');
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

  return (
    <StoreContext.Provider value={store}>
      <Layout />
    </StoreContext.Provider>
  );
}

export default codePush(App);

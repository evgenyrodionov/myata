import React from 'react';
import firebase from 'react-native-firebase';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import codePush from 'react-native-code-push';
import StoreContext from 'storeon/react/context';

import Main from './Main';
import Auth from './Auth';

import store from './store';

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

  return (
    <StoreContext.Provider value={store}>
      <Layout />
    </StoreContext.Provider>
  );
}

export default codePush(App);

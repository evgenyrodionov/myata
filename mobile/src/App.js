import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import firebase from 'react-native-firebase';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import codePush from 'react-native-code-push';
import StoreContext from 'storeon/react/context';

import Main from './Main';
import Auth from './Auth';

import store from './store';

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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // TODO: log to sentry
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <SafeAreaView>
          <View>
            <Text>Произошла ошибка</Text>

            <Text>{JSON.stringify(this.state.error, null, 2)}</Text>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

function App() {
  const Layout = createAppContainer(rootNavigator);

  return (
    <StoreContext.Provider value={store}>
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    </StoreContext.Provider>
  );
}

export default codePush(App);

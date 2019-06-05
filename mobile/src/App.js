import React from 'react';
import firebase from 'react-native-firebase';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Main from './Main';
import Auth from './Auth';

class AuthLoading extends React.Component {
  async componentDidMount() {
    const { currentUser } = firebase.auth();

    this.props.navigation.navigate(
      currentUser && currentUser.uid ? 'Main' : 'Auth',
    );
  }

  render() {
    return null;
  }
}

const rootNavigator = createSwitchNavigator(
  {
    Main,
    Auth,
    AuthLoading,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

function App() {
  const Layout = createAppContainer(rootNavigator);

  return <Layout />;
}

export default App;

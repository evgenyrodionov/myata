import React from 'react';
import { Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import styled, { css } from 'styled-components';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.ScrollView`
  width: ${deviceWidth};
  padding-horizontal: 16;
  padding-top: 28;
`;

const Heading = styled.Text`
  font-size: 36;
  font-weight: bold;
  margin-bottom: 8;
  color: #fff;

  ${p =>
    p.center
    && css`
      text-align: center;
    `}
`;

const LogoutButton = styled.TouchableOpacity`
  padding-vertical: 12;
  margin-top: 24;
  background-color: #111;
  border-radius: 8;
`;

const LogoutButtonText = styled.Text`
  font-size: 14;
  font-weight: 600;
  line-height: 22;
  color: #fff;
  text-align: center;
`;

const PhoneNumber = styled.Text`
  font-size: 18;
  font-weight: 400;
  margin-top: 4;
  color: #fff;
  text-align: center;
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class Profile extends React.Component {
  render() {
    const user = firebase.auth().currentUser;
    const phoneNumber = parsePhoneNumberFromString(
      user.phoneNumber,
    ).formatInternational();

    return (
      <View>
        <Heading center>{user.displayName || ''}</Heading>
        <PhoneNumber>{phoneNumber || ''}</PhoneNumber>

        <LogoutButton
          onPress={() => {
            firebase.auth().signOut();
            this.props.navigation.navigate('Auth');
          }}
        >
          <LogoutButtonText>Выйти из аккаунта</LogoutButtonText>
        </LogoutButton>
      </View>
    );
  }
}

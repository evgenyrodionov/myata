import React from 'react';
import {
  RefreshControl, Dimensions, Alert, Switch,
} from 'react-native';
import firebase from 'react-native-firebase';
import styled, { css } from 'styled-components';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Safari from 'react-native-safari-view';
import {
  Title as OrigTitle,
  ButtonWithIcon,
  IconLogout,
  IconEdit,
  FooterPusher,
} from '../ui';
import { getPhotoUrl } from '../utils/photos';
import placeholder from './placeholder.png';

const { width: deviceWidth } = Dimensions.get('window');

const firestore = firebase.firestore();

const Wrapper = styled.View``;

const View = styled.ScrollView`
  width: ${deviceWidth};
  padding-horizontal: 16;
  padding-top: 20;
`;

const Photo = styled.Image`
  width: 128;
  height: 128;
  align-self: center;
  border-radius: 64;
  margin-top: 12;
  margin-bottom: 24;
`;

const Title = styled(OrigTitle)`
  margin-bottom: 14;
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

const PhoneNumber = styled.Text`
  font-size: 18;
  font-weight: 400;
  margin-top: 4;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
`;

const Button = styled(ButtonWithIcon)`
  margin-bottom: 12;
`;

const FlatList = styled.FlatList``;

const Separator = styled.View`
  border-bottom-width: 1;
  border-bottom-color: rgba(255, 255, 255, 0.04);
  border-style: solid;
  margin-vertical: 8;
`;

const FriendsSt = styled.View`
  margin-top: 56;
`;

const FriendList = styled.FlatList``;

const Friend = styled.TouchableOpacity`
  display: flex;
`;

const FriendName = styled.Text`
  color: #fff;
  font-size: 18;
`;

const FriendPhoneNumber = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4;
`;

const HollowSeparator = styled.View`
  margin-vertical: 8;
`;

const ReferralDesc = styled.Text`
  color: rgba(255, 255, 255, 0.4);
`;

const ReferralInput = styled.TouchableOpacity`
  margin-top: 24;
  margin-bottom: 16;
`;

const ReferralInputText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18;
  font-weight: bold;
`;

function Friends({ user }) {
  return (
    <FriendsSt>
      <Title>Мои друзья</Title>

      <FriendList
        data={user.friends}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Friend>
            <FriendName>{item.displayName}</FriendName>
            <FriendPhoneNumber>
              {parsePhoneNumberFromString(`+${item.id}`).formatInternational()}
            </FriendPhoneNumber>
          </Friend>
        )}
        ItemSeparatorComponent={HollowSeparator}
      />

      {user.referralId && (
        <ReferralInput
          onPress={() =>
            Safari.show({
              url: `https://myata.page.link/invites/${user.referralId}`,
            })
          }
        >
          <ReferralInputText>
            myata.page.link/invites/{user.referralId}
          </ReferralInputText>
        </ReferralInput>
      )}

      <ReferralDesc>
        Приведи друга и получи 100 баллов после того, как он потратит первые 1
        000 ₽
      </ReferralDesc>
    </FriendsSt>
  );
}

const NotificationsSt = styled.View`
  margin-top: 56;
`;

const Notification = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NotificationTitle = styled.Text`
  color: #fff;
`;

const notificationsDict = {
  new_place_in_my_town: 'Новая Мята в моём городе',
  new_event_in_favorited_place: 'События в моих любимых Мятах',
  invoice: 'Закрытие счёта',
  new_place: 'Новая Мята',
};

function Notifications({ user }) {
  const { notifications = {} } = user;

  function onChange(key, value) {
    const path = `notifications.${key}`;

    return firestore
      .collection('users')
      .doc(user.id)
      .update({ [path]: !value });
  }

  return (
    <NotificationsSt>
      <Title>Уведомления</Title>

      <FlatList
        data={Object.entries(notifications)}
        keyExtractor={([key]) => String(key)}
        renderItem={({ item: [key, value] }) => (
          <Notification>
            <NotificationTitle>{notificationsDict[key]}</NotificationTitle>
            <Switch value={value} onValueChange={() => onChange(key, value)} />
          </Notification>
        )}
        ItemSeparatorComponent={Separator}
      />
    </NotificationsSt>
  );
}

const onLogout = (onConfirm) => {
  Alert.alert('Выйти из аккаунта?', null, [
    {
      text: 'Нет',
      style: 'cancel',
    },
    {
      text: 'Да',
      style: 'destructive',
      onPress: onConfirm,
    },
  ]);
};

function loadList() {
  return {};
}

const Logout = styled.View`
  margin-top: 24;
`;

export default function Profile({ user, navigation, ...props }) {
  const { dispatch = () => ({}), isFetching = false } = props;

  const onLogoutConfirm = () => {
    firebase.auth().signOut();
    props.navigation.navigate('Auth');
  };

  const refreshControl = (
    <RefreshControl
      onRefresh={() => dispatch(loadList())}
      enabled={!isFetching}
      // refreshing={isFetching && orders.length !== 0}
      refreshing={isFetching}
    />
  );

  const photoSrc = user.photoId
    ? { uri: `${getPhotoUrl(user.photoId)}-/resize/x256/` }
    : placeholder;

  return (
    <Wrapper refreshControl={refreshControl}>
      <View>
        <Photo source={photoSrc} />

        <Heading center>{user.displayName || ''}</Heading>
        <PhoneNumber>{user.formattedPhoneNumber || ''}</PhoneNumber>

        {/* {user && <Friends user={user} />} */}
        {user && <Notifications user={user} />}

        <Logout>
          <Button
            icon={<IconEdit color="#eee" size={16} />}
            bgColor="#fff"
            textColor="#111"
            onPress={() => navigation.navigate('ProfileEdit', { user })}
          >
            Редактировать профиль
          </Button>
          <Button
            icon={<IconLogout color="#eee" size={18} />}
            bgColor="#111"
            textColor="#fff"
            onPress={() => onLogout(onLogoutConfirm)}
          >
            Выйти из аккаунта
          </Button>
        </Logout>

        <FooterPusher />
      </View>
    </Wrapper>
  );
}

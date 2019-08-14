import React from 'react';
import styled from 'styled-components';
import { AsYouType } from 'libphonenumber-js';
import ImagePicker from 'react-native-image-picker';
import { Card as OrigCard, Title as OrigTitle, Button } from '../ui';
import { updateWithMerge } from './api';
import { getPhotoUrl } from '../utils/photos';
import placeholder from './placeholder.png';

const Card = styled(OrigCard)``;

const Photo = styled.Image`
  width: 128;
  height: 128;
  align-self: center;
  border-radius: 64;
  margin-top: 24;
`;

const Name = styled.View`
  margin-top: 32;
`;

const PhoneNumber = styled.View`
  margin-top: 48;
  margin-bottom: 48;
`;

const Title = styled(OrigTitle)``;

const Input = styled.TextInput`
  border-bottom-color: rgba(200, 200, 200, 0.15);
  border-bottom-width: 1;
  padding-vertical: 8;
  font-size: 20;
  color: #fff;
  margin-top: 8;
`;

const PhotoTouchableOpacity = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})``;

const ActivityIndicator = styled.ActivityIndicator``;

const options = {
  title: 'Выберите фотографию',
  cameraType: 'front',
  mediaType: 'photo',
  allowsEditing: true,
};

async function save(userId, data) {
  const { name: displayName, photo } = data;

  const url = 'https://upload.uploadcare.com/base/';
  const body = new FormData();
  body.append('file', {
    name: 'noname',
    type: 'image/jpg',
    uri: photo.uri,
  });
  body.append('UPLOADCARE_PUB_KEY', '86a667e1f234c73e94a6');
  body.append('UPLOADCARE_STORE', '1');

  try {
    const res = await fetch(url, {
      method: 'POST',
      body,
    });

    const { file: photoId } = await res.json();

    return Promise.resolve(updateWithMerge(userId, { displayName, photoId }));
  } catch (e) {
    return Promise.reject(e);
  }
}

export default function ({ navigation }) {
  const user = navigation.getParam('user') || {};
  const [isLoading, updateLoading] = React.useState(false);

  const [name, updateName] = React.useState(user.displayName);
  const [photo, updatePhoto] = React.useState(
    user.photoId ? { uri: `${getPhotoUrl(user.photoId)}-/resize/x256/` } : {},
  );
  const [phoneNumber, updatePhoneNumber] = React.useState(
    user.formattedPhoneNumber,
  );

  function onChangePhoneNumber(text) {
    const formattedPhoneNumber = new AsYouType().input(text);

    updatePhoneNumber(formattedPhoneNumber);
  }

  function onPhotoChange() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        updatePhoto({ uri: response.uri });
      }
    });
  }

  async function onSave() {
    updateLoading(true);

    await save(user.id, { name, phoneNumber, photo });

    navigation.goBack();
  }

  return (
    <Card>
      <PhotoTouchableOpacity onPress={onPhotoChange}>
        <Photo source={photo.uri ? photo : placeholder} />
      </PhotoTouchableOpacity>

      <Name>
        <Title>Как вас зовут?</Title>

        <Input onChangeText={updateName} value={name} />
      </Name>

      <PhoneNumber>
        <Title>Номер телефона</Title>
        <Input
          onChangeText={onChangePhoneNumber}
          value={phoneNumber}
          textContentType="telephoneNumber"
        />
      </PhoneNumber>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button bgColor="#fff" textColor="#111" center onPress={onSave}>
          Сохранить изменения
        </Button>
      )}
    </Card>
  );
}

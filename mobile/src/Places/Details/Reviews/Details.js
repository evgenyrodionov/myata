import React from 'react';
import styled from 'styled-components';
import { AirbnbRating } from 'react-native-ratings';
import firebase from 'react-native-firebase';
import nanoid from 'nanoid/non-secure';
import { Card, Title as OrigTitle, Button } from '../../../ui';

const firestore = firebase.firestore();

const Title = styled(OrigTitle)`
  margin-bottom: 24;
`;

const Textarea = styled.TextInput`
  width: 100%;
  border-radius: 4;
  background-color: rgba(255, 255, 255, 0.98);
  color: #111;
  font-size: 14;
  height: 128;
  padding-horizontal: 12;
  padding-top: 14;
  padding-bottom: 14;
  margin-bottom: 12;
  margin-top: 16;
`;

const Disclaimer = styled.Text`
  text-align: center;
  margin-top: 0;
  font-size: 12;
  color: #ccc;
`;

const ActivityIndicator = styled.ActivityIndicator`
  margin-top: 12;
  margin-bottom: 12;
`;

function save(placeId, { user, text, rating }) {
  const data = {
    id: nanoid(),
    text,
    rating,
    userRef: user.ref,
    createdAt: new Date(),
  };

  return firestore
    .collection('places')
    .doc(placeId)
    .update({
      reviews: firebase.firestore.FieldValue.arrayUnion(data),
    });
}

export default function ({ navigation }) {
  const place = navigation.getParam('place');
  const user = navigation.getParam('user');
  const [text, setText] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [isLoading, updateLoading] = React.useState(false);

  const disabled = text.length === 0;

  async function onSave() {
    updateLoading(true);

    await save(place.id, { user, text, rating });

    navigation.goBack();
  }

  return (
    <Card stackLevel={2} onGoBack={navigation.goBack}>
      <Title>Оставить отзыв о Мяте {place.title}</Title>

      <AirbnbRating
        defaultRating={rating}
        showRating={false}
        selectedColor="#FECB2E"
        imageSize={12}
        onFinishRating={setRating}
      />

      <Textarea
        multiline
        numberOfLines={4}
        onChangeText={setText}
        value={text}
        keyboardAppearance="dark"
        autoFocus
      />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          bgColor="#20B4AB"
          textColor="#C2F0ED"
          center
          onPress={onSave}
          disabled={disabled}
        >
          Оставить отзыв
        </Button>
      )}

      <Disclaimer>Администрация не удаляет отзывы</Disclaimer>
    </Card>
  );
}

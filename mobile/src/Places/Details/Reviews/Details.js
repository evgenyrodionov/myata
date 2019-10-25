import React from 'react';
import { Alert, View } from 'react-native';
import styled from 'styled-components';
import { AirbnbRating } from 'react-native-ratings';
import firebase from 'react-native-firebase';
import nanoid from 'nanoid/non-secure';
import {
  Card,
  Title as OrigTitle,
  Button,
  IconChecked,
  IconUnchecked,
} from '../../../ui';

const firestore = firebase.firestore();

const Title = styled(OrigTitle)`
  margin-bottom: 24;
`;

const Textarea = styled.TextInput`
  width: 100%;
  border-radius: 4;
  background-color: #191919;
  color: #fff;
  height: 128;
  padding-horizontal: 12;
  padding-top: 14;
  padding-bottom: 14;
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

const HiddenReviewCheckbox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  display: flex;
  padding-vertical: 10;
  margin-bottom: 12;
  flex-direction: row;
`;

const HiddenReviewCheckboxText = styled.Text`
  color: #fff;
  margin-left: 4;
`;

function save(placeId, { user, ...review }) {
  const data = {
    id: nanoid(),
    userRef: user.ref,
    createdAt: new Date(),
    ...review,
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
  const [personal, setPersonal] = React.useState(false);
  const [isLoading, updateLoading] = React.useState(false);

  const disabled = text.length === 0;

  async function onSave() {
    updateLoading(true);

    await save(place.id, {
      user,
      text,
      rating,
      personal,
    });

    if (personal) {
      Alert.alert(
        'Спасибо за Ваш отзыв! Вы помогаете становиться нам лучше. Отзыв отправлен управляющему.',
      );
    }

    navigation.goBack();
  }

  return (
    <Card stackLevel={2} onGoBack={navigation.goBack}>
      <View keyboardShouldPersistTaps="handled">
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
        />

        <HiddenReviewCheckbox onPress={() => setPersonal(!personal)}>
          {personal ? (
            <IconChecked color="#20B4AB" size={18} />
          ) : (
            <IconUnchecked color="#fff" size={18} />
          )}

          <HiddenReviewCheckboxText>
            Отправить отзыв управляющему и скрыть из общего списка
          </HiddenReviewCheckboxText>
        </HiddenReviewCheckbox>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button
            bgColor="#20B4AB"
            textColor="#fff"
            center
            onPress={onSave}
            disabled={disabled}
          >
            Оставить отзыв
          </Button>
        )}

        <Disclaimer>Администрация не удаляет отзывы</Disclaimer>
      </View>
    </Card>
  );
}

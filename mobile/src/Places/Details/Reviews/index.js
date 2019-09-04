import React from 'react';
import { Dimensions, Alert } from 'react-native';
import styled from 'styled-components';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import differenceInHours from 'date-fns/difference_in_hours';
import ruLocale from 'date-fns/locale/ru';
import times from 'lodash/times';
import {
  Title as OrigTitle,
  Alert as UIAlert,
  Button,
  IconStar,
} from '../../../ui';
import { getPhotoUrl } from '../../../utils/photos';
import { saveReviews } from '../../api';

const { width: deviceWidth } = Dimensions.get('window');

const Title = styled(OrigTitle)`
  margin-bottom: 12;
`;

const List = styled.FlatList`
  margin-bottom: 24;
`;

const Disclaimer = styled.Text`
  text-align: center;
  margin-top: 6;
  font-size: 12;
  color: #ccc;
`;

const Review = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  background: #191919;
  border-radius: 10;
  /* padding-horizontal: 12; */
  padding-vertical: 12;
  padding-bottom: 14;
  padding-horizontal: 12;
  width: ${deviceWidth - 16 * 2 - 16};
  margin-right: 8;
  position: relative;
`;

const ReviewHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 12;
`;

const ReviewAuthor = styled.View`
  margin-left: 8;
`;

const ReviewState = styled.View`
  display: flex;
  flex-direction: row;
`;

const ReviewAuthorPhoto = styled.Image`
  width: 42;
  height: 42;
  border-radius: 10;
`;

const ReviewAuthorName = styled.Text`
  font-size: 14;
  font-weight: bold;
  margin-bottom: 4;
  color: #fff;
`;

const ReviewDate = styled.Text`
  color: #999999;
  margin-left: 4;
`;

const ReviewText = styled.Text`
  font-size: 14;
  color: #fff;
  min-height: 64;
`;

const ReviewIcon = styled(IconStar)`
  margin-right: 2;
`;

const ItemSeparatorComponent = styled.View`
  width: 2;
`;

const ReviewDeleteButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  padding-vertical: 10;
  background-color: #af282d;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ReviewDeleteButtonText = styled.Text`
  font-size: 12;
  color: #ecacae;
  text-align: center;
  font-weight: bold;
`;

function renderReview({
  item, user, reviews, placeId,
}) {
  const { displayName, photoId } = item.user || {};
  const reviewDate = distanceInWordsStrict(new Date(), item.createdAt, {
    locale: ruLocale,
    addSuffix: true,
  });

  const diffInHours = differenceInHours(new Date(), item.createdAt);
  const canDelete = diffInHours < 72 && user.id === item.user.id;

  function onConfirmDelete() {
    return saveReviews(
      placeId,
      reviews.filter(({ id }) => id !== item.id),
    ).then(() => {
      Alert.alert('Отзыв удалён');
    });
  }

  function onDelete() {
    return Alert.alert('Удалить отзыв?', null, [
      {
        text: 'Нет',
        style: 'cancel',
      },
      {
        text: 'Да',
        style: 'destructive',
        onPress: onConfirmDelete,
      },
    ]);
  }

  return (
    <Review key={item.id}>
      <ReviewHeader>
        <ReviewAuthorPhoto
          source={{ uri: getPhotoUrl(`${photoId}/-/resize/x84`) }}
        />

        <ReviewAuthor>
          <ReviewAuthorName>{displayName}</ReviewAuthorName>
          <ReviewState>
            {times(5, num => (
              <ReviewIcon
                key={num}
                color={num < item.rating ? '#FECB2E' : '#eee'}
                size={16}
              />
            ))}
            <ReviewDate>{reviewDate}</ReviewDate>
          </ReviewState>
        </ReviewAuthor>
      </ReviewHeader>

      <ReviewText>{item.text.trim()}</ReviewText>

      {canDelete && (
        <ReviewDeleteButton onPress={onDelete}>
          <ReviewDeleteButtonText>Удалить мой отзыв</ReviewDeleteButtonText>
        </ReviewDeleteButton>
      )}
    </Review>
  );
}

function ListEmptyComponent() {
  return (
    <UIAlert white center>
      Пока нет ни одного отзыва о заведении. Оставите свой?
    </UIAlert>
  );
}

export default function Reviews({
  navigation,
  item: { reviews = [] },
  item: place,
  user,
}) {
  return (
    <>
      <Title>Отзывы {reviews.length > 0 && `(${reviews.length})`}</Title>

      {reviews.length > 0 && (
        <List
          horizontal
          // pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={reviews}
          keyExtractor={({ createdAt }) => String(createdAt)}
          renderItem={({ item }) =>
            renderReview({
              item,
              user,
              reviews,
              placeId: place.id,
            })
          }
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      )}

      {reviews.length === 0 && <ListEmptyComponent />}

      <Button
        bgColor="#20B4AB"
        textColor="#C2F0ED"
        center
        onPress={() => navigation.navigate('PlaceNewReview', { place, user })}
      >
        Оставить отзыв
      </Button>

      <Disclaimer>Администрация не удаляет отзывы</Disclaimer>
    </>
  );
}

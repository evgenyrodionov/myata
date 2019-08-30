import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import ruLocale from 'date-fns/locale/ru';
import times from 'lodash/times';
import {
  Title, Alert, Button, IconStar,
} from '../../../ui';
import { getPhotoUrl } from '../../../utils/photos';

const { width: deviceWidth } = Dimensions.get('window');

const List = styled.FlatList`
  margin-bottom: 16;
  border-bottom-color: rgba(255, 255, 255, 0.05);
  border-bottom-width: 1;
`;

const Disclaimer = styled.Text`
  text-align: center;
  margin-top: 6;
  font-size: 12;
  color: #ccc;
`;

const Review = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  /* background: #fff; */
  border-radius: 10;
  /* padding-horizontal: 12; */
  padding-vertical: 12;
  padding-bottom: 14;
  width: ${deviceWidth - 16 * 2 - 16};
  margin-right: 8;
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
`;

const ReviewIcon = styled(IconStar)`
  margin-right: 2;
`;

const ItemSeparatorComponent = styled.View`
  width: 2;
`;

function renderReview({ item }) {
  const { displayName, photoId, id } = item.user || {};
  const reviewDate = distanceInWordsStrict(new Date(), item.createdAt, {
    locale: ruLocale,
    addSuffix: true,
  });

  return (
    <Review key={id}>
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
                color={num < item.rating ? '#20B4AB' : '#eee'}
                size={16}
              />
            ))}
            <ReviewDate>{reviewDate}</ReviewDate>
          </ReviewState>
        </ReviewAuthor>
      </ReviewHeader>

      <ReviewText>{item.text.trim()}</ReviewText>
    </Review>
  );
}

function ListEmptyComponent() {
  return (
    <Alert white center>
      Пока нет ни одного отзыва о заведении. Оставите свой?
    </Alert>
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
      <Title>Отзывы</Title>

      {reviews.length > 0 && (
        <List
          horizontal
          // pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={reviews}
          keyExtractor={({ createdAt }) => String(createdAt)}
          renderItem={renderReview}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      )}

      {reviews.length === 0 && <ListEmptyComponent />}

      <Button
        bgColor="#fff"
        textColor="#111"
        center
        onPress={() => navigation.navigate('PlaceNewReview', { place, user })}
      >
        Оставить отзыв
      </Button>

      <Disclaimer>Администрация не удаляет отзывы</Disclaimer>
    </>
  );
}

import React from 'react';
import { Dimensions, Alert, StyleSheet } from 'react-native';
import styled from 'styled-components';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import differenceInHours from 'date-fns/difference_in_hours';
import ruLocale from 'date-fns/locale/ru';
import pluralize from 'pluralize-ru';
import times from 'lodash/times';
import useStoreon from 'storeon/react';
import LinearGradient from 'react-native-linear-gradient';

import {
  Title as OrigTitle,
  Alert as UIAlert,
  GradientButtonWithIcon,
  colorsToGradient,
  kindToColor,
  IconStar,
  CollapsibleText,
} from '../../../ui';
import { getPhotoUrl } from '../../../utils/photos';
import { saveReviews } from '../../api';

const { width: deviceWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  gradientButton: {
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

const Title = styled(OrigTitle)`
  margin-bottom: 12;
`;

const List = styled.FlatList`
  margin-bottom: 24;
  /* width: ${deviceWidth + 16 * 2 + 10}; */
`;

const Disclaimer = styled.Text`
  text-align: center;
  margin-top: 2;
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
  width: ${deviceWidth - 16 * 2 - 10};
  /* margin-right: 8; */
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

const ReviewText = styled.View`
  /* min-height: 64; */

  ${({ canDelete }) => canDelete && 'margin-bottom: 44;'}
`;

const ReviewIcon = styled(IconStar)`
  margin-right: 4;
`;

const ItemSeparatorComponent = styled.View`
  width: 10;
`;

const ReviewDisclaimer = styled.Text`
  position: absolute;
  bottom: 42;
  left: 0;
  right: 0;
  text-align: center;
  color: #ccc;
  font-size: 12;
`;

const ReviewDeleteButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ReviewDeleteButtonText = styled.Text`
  font-size: 12;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;

function renderReview({
  item,
  user,
  reviews,
  placeId,
  isOpened,
  toggleOpened,
}) {
  const { displayName, photoId } = item.user || {};
  const reviewDate = distanceInWordsStrict(new Date(), item.createdAt, {
    locale: ruLocale,
    addSuffix: true,
  });

  const diffInHours = differenceInHours(new Date(), item.createdAt);
  const remainingHours = 72 - diffInHours;
  const canDelete = diffInHours < 72 && user.id === item.user.id;
  const initialTextLength = canDelete ? 155 : 360;

  function onConfirmDelete() {
    return saveReviews(placeId, reviews.filter(({ id }) => id !== item.id));
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

      <ReviewText canDelete={canDelete}>
        <CollapsibleText
          isOpened={isOpened}
          toggleOpened={toggleOpened}
          initialTextLength={initialTextLength}
          textStyle={{ fontSize: 14, color: '#fff' }}
          text={item.text.trim()}
        />
      </ReviewText>

      {canDelete && (
        <>
          <ReviewDisclaimer>
            Опубликуется через{' '}
            {pluralize(
              remainingHours,
              '0 часов',
              '%d час',
              '%d часа',
              '%d часов',
            )}
          </ReviewDisclaimer>
          <ReviewDeleteButton onPress={onDelete}>
            <LinearGradient
              colors={['#7e171b', '#b0272e', '#7e171b']}
              style={styles.gradientButton}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              useAngle
              angle={90}
            >
              <ReviewDeleteButtonText>Удалить</ReviewDeleteButtonText>
            </LinearGradient>
          </ReviewDeleteButton>
        </>
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
}) {
  const { user } = useStoreon('user');

  const [isOpened, toggleOpened] = React.useState(false);
  const filteredReviews = reviews.filter((review) => {
    const diffInHours = differenceInHours(new Date(), review.createdAt);
    const remainingHours = 72 - diffInHours;
    const isVisible = user.id === review.user.id
      || (user.id !== review.user.id && remainingHours < 0);

    return isVisible && !review.personal;
  });

  function onMomentumScrollEnd() {
    toggleOpened(false);
  }

  return (
    <>
      <Title>
        Отзывы {filteredReviews.length > 0 && `(${filteredReviews.length})`}
      </Title>

      {filteredReviews.length > 0 && (
        <List
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={filteredReviews}
          keyExtractor={({ createdAt }) => String(createdAt)}
          renderItem={({ item }) =>
            renderReview({
              item,
              user,
              reviews,
              placeId: place.id,
              isOpened,
              toggleOpened,
            })
          }
          ItemSeparatorComponent={ItemSeparatorComponent}
          onMomentumScrollEnd={onMomentumScrollEnd}
        />
      )}

      {filteredReviews.length === 0 && <ListEmptyComponent />}

      <GradientButtonWithIcon
        colors={
          colorsToGradient[kindToColor[place.kind]]
          || colorsToGradient[kindToColor.default]
        }
        textColor="#fff"
        center
        onPress={() => navigation.navigate('PlaceNewReview', { place, user })}
      >
        Оставить отзыв
      </GradientButtonWithIcon>

      <Disclaimer>Администрация не удаляет отзывы</Disclaimer>
    </>
  );
}

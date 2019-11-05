import React from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from '@react-native-community/blur';
import firebase from 'react-native-firebase';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import pluralize from 'pluralize-ru';

import { SimpleStepper } from 'react-native-simple-stepper';

import { getCurrentUser } from '../../Profile/api';
import {
  Card as OrigCard,
  Title as OrigTitle,
  GradientButtonWithIcon,
  Alert,
  colorsToGradient,
  kindToColor,
} from '../../ui';

import increaseIcon from './increase.png';
import decreaseIcon from './decrease.png';

const firestore = firebase.firestore();

const Card = styled(OrigCard)``;

const Time = styled.View`
  margin-top: 16;
`;

const People = styled.View`
  margin-top: 48;
  margin-bottom: 24;
`;

const Title = styled(OrigTitle)``;

const DateTimePickerWrapper = styled(BlurView)`
  /* background: rgba(255, 255, 255, 0.7); */
  border-radius: 10;
`;

const PeopleForm = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4;
`;

const PeopleFormText = styled.Text`
  color: #fff;
  font-size: 16;
`;

const ActivityIndicator = styled.ActivityIndicator``;
const TouchableOpacity = styled.TouchableOpacity``;

export default function ({ navigation }) {
  const place = navigation.getParam('place') || {};
  const [isLoading, updateLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);

  const [people, updatePeople] = React.useState(1);
  const [date, updateDate] = React.useState(new Date());

  const formattedPhoneNumber = parsePhoneNumberFromString(
    String(place.phoneNumber),
  ).formatInternational();

  function onSave() {
    updateLoading(true);

    firestore
      .collection('reservations')
      .add({
        placeTitle: place.title,
        phoneNumber: getCurrentUser().phoneNumber,
        toPhoneNumber: place.phoneNumber,
        count: people,
        reservationAt: date,
      })
      .then(() => {
        setSuccess(true);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setSuccess(false);
      })
      .finally(() => {
        updateLoading(false);
      });
  }

  return (
    <Card>
      <Time>
        <Title>На какое время?</Title>

        <DateTimePickerWrapper blurType="xlight">
          <DateTimePicker
            mode="datetime"
            value={date}
            onChange={(event, newDate) => updateDate(newDate)}
          />
        </DateTimePickerWrapper>
      </Time>

      <People>
        <Title>Сколько людей?</Title>

        <PeopleForm>
          <PeopleFormText>
            {pluralize(
              people,
              '%d человек',
              '%d человек',
              '%d человека',
              '%d людей',
            )}
          </PeopleFormText>

          <SimpleStepper
            textStyle={{
              color: '#fff',
              fontSize: 16,
              paddingHorizontal: 6,
              fontVariant: ['tabular-nums'],
            }}
            minimumValue={1}
            maximumValue={15}
            initialValue={people}
            value={people}
            valueChanged={updatePeople}
            {...{
              incrementImage: increaseIcon,
              decrementImage: decreaseIcon,
              separatorStyle: {},
              containerStyle: {
                backgroundColor: 'transparent',
                flexDirection: 'row',
                overflow: 'hidden',
                alignItems: 'center',
              },

              incrementImageStyle: { width: 14, height: 14 },
              decrementImageStyle: { width: 14, height: 14 },
              incrementStepStyle: {
                padding: 6,
                borderWidth: 1,
                borderRadius: 14,
                borderColor: '#fff',
              },
              decrementStepStyle: {
                padding: 6,
                borderWidth: 1,
                borderRadius: 14,
                borderColor: '#fff',
              },
            }}
          />
        </PeopleForm>
      </People>

      {isLoading && <ActivityIndicator />}
      {!isLoading && !success && error && (
        <Alert white center>
          Произошла ошибка при бронировании, мы её зафиксировали и скоро
          исправим. Позвоните в заведение для бронирования:{' '}
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${place.phoneNumber}`)}
          >
            {formattedPhoneNumber}
          </TouchableOpacity>
        </Alert>
      )}
      {!isLoading && !error && success && (
        <Alert white center>
          Заявка принята, скоро вам перезвонит администратор для подтверждения
        </Alert>
      )}
      {!isLoading && !error && !success && (
        <GradientButtonWithIcon
          colors={
            colorsToGradient[kindToColor[place.kind]]
            || colorsToGradient[kindToColor.default]
          }
          textColor="#fff"
          center
          onPress={onSave}
        >
          Запросить бронирование
        </GradientButtonWithIcon>
      )}
    </Card>
  );
}

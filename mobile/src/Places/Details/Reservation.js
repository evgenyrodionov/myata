import React from 'react';
import styled from 'styled-components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from '@react-native-community/blur';
import pluralize from 'pluralize-ru';
import { SimpleStepper } from 'react-native-simple-stepper';
import { Card as OrigCard, Title as OrigTitle, Button } from '../../ui';

import increaseIcon from './increase.png';
import decreaseIcon from './decrease.png';

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

async function save(userId, data) {
  // const { name: displayName, photo } = data;
  // const url = 'https://upload.uploadcare.com/base/';
  // const body = new FormData();
  // body.append('file', {
  //   name: 'noname',
  //   type: 'image/jpg',
  //   uri: photo.uri,
  // });
  // body.append('UPLOADCARE_PUB_KEY', '86a667e1f234c73e94a6');
  // body.append('UPLOADCARE_STORE', '1');
  // try {
  //   const res = await fetch(url, {
  //     method: 'POST',
  //     body,
  //   });
  //   const { file: photoId } = await res.json();
  //   return Promise.resolve(updateWithMerge(userId, { displayName, photoId }));
  // } catch (e) {
  //   return Promise.reject(e);
  // }
}

export default function ({ navigation }) {
  const place = navigation.getParam('place') || {};
  const [isLoading, updateLoading] = React.useState(false);
  const [people, updatePeople] = React.useState(1);

  async function onSave() {
    updateLoading(true);

    await save(place.id, {});

    // navigation.goBack();
  }

  return (
    <Card>
      <Time>
        <Title>На какое время?</Title>

        <DateTimePickerWrapper blurType="xlight">
          <DateTimePicker mode="datetime" value={new Date()} />
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

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button bgColor="#fff" textColor="#111" center onPress={onSave}>
          Запросить бронирование
        </Button>
      )}
    </Card>
  );
}

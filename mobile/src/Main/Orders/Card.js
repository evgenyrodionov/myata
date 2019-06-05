import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import ruLocale from 'date-fns/locale/ru';

const StCard = styled.View`
  padding-horizontal: 16;
  padding-top: 20;
  padding-bottom: 16;
  border: 1px solid #eee;

  border-radius: 10;
  background: #fff;
  /* shadow-color: #000;
  shadow-offset: 0px 20px;
  shadow-opacity: 0.58;
  shadow-radius: 16;
  elevation: 24; */
`;

const Header = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: 15;
`;

const DateLabel = styled(Text)`
  color: #9c9c9c;
`;

const State = styled(Text)`
  font-weight: bold;
  color: ${p => p.color || '#9c9c9c'};
`;

const Title = styled.Text`
  font-size: 24;
  line-height: 26;
  font-weight: 600;
  margin-vertical: 8;
`;

const ManagerTitle = styled.Text`
  font-size: 14;
  font-weight: 600;
`;

const ManagerDescription = styled.Text`
  font-size: 12;
  color: #9c9c9c;
  margin-top: 2;
`;

const states = {
  need_upload_documents: {
    title: 'Загрузите документы',
    color: '#f4b63f',
  },
  waiting_for_call: {
    title: 'Ожидайте звонка',
    color: '#9c9c9c',
  },
  waiting_for_dactyloscopy: {
    title: 'Назначена дактилоскопия',
    color: '#7DCE56',
  },
};

export default function Card({ item, onPress }) {
  const { title: stateTitle, color: stateColor } = states[item.state] || {};

  return (
    <TouchableOpacity onPress={onPress}>
      <StCard>
        <Header>
          <DateLabel>
            {distanceInWordsStrict(new Date(), item.createdAt, {
              locale: ruLocale,
              addSuffix: true,
            })}
          </DateLabel>
          <State color={stateColor}>{stateTitle}</State>
        </Header>
        <Title>{item.title}</Title>

        <ManagerTitle>Олеся Молчанова</ManagerTitle>
        <ManagerDescription>Личный менеджер</ManagerDescription>
      </StCard>
    </TouchableOpacity>
  );
}

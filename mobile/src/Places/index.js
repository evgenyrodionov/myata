import React from 'react';
import { RefreshControl, Dimensions } from 'react-native';
import styled, { css } from 'styled-components';
import * as Haptics from 'expo-haptics';
import useStoreon from 'storeon/react';

import Card from './Card';
import Filter from './Filter';
import { FooterPusher, Alert } from '../ui';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.ScrollView`
  width: ${deviceWidth};
  padding-horizontal: 16;
  padding-top: 20;
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

const List = styled.FlatList`
  margin-top: 10;
`;

const Item = styled.View`
  margin-bottom: 26;
`;

function loadList() {
  return [];
}

function renderItem({ item }, { navigation, user }) {
  return (
    <Item>
      <Card
        item={item}
        onPress={() => {
          navigation.navigate('PlaceDetails', {
            id: item.id,
            user,
          });
        }}
      />
    </Item>
  );
}

function ListEmptyComponent() {
  return (
    <Alert white center>
      Увы, мы&nbsp;ещё не&nbsp;добавили Мяты из&nbsp;этого города 😔
    </Alert>
  );
}

const filterParents = {
  street: 'district',
  district: 'city',
  city: 'country',
};

function filter(data, selected = [], selectedKind) {
  const filtered = selected.find(({ kind }) => kind === selectedKind) || {};

  return data.filter(({ address }) => address[selectedKind] === filtered.title);
}

export default function Places({ ...props }) {
  const { dispatch = () => ({}), isFetching = false } = props;
  const [selectedKind, updateKind] = React.useState([null, []]);
  const [selectedValues, updateValues] = React.useState([]);
  const { places } = useStoreon('places');

  React.useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }, [selectedKind]);

  function onFilterUpdate(kind, title, index) {
    const [, indexes] = selectedKind;
    const indexesPath = [...indexes, index];

    updateKind([kind, indexesPath]);
    updateValues([...selectedValues, { kind, title, indexesPath }]);
  }

  function onFilterRemove(kind, index) {
    const [, indexes] = selectedKind;

    updateKind([filterParents[kind], indexes.slice(0, index)]);
    return updateValues(selectedValues.slice(0, index));
  }

  const data = filter(places, selectedValues, selectedKind[0]) || places;

  const refreshControl = (
    <RefreshControl
      onRefresh={() => dispatch(loadList())}
      enabled={!isFetching}
      // refreshing={isFetching && orders.length !== 0}
      refreshing={isFetching}
    />
  );

  return (
    <View refreshControl={refreshControl}>
      <Heading>Заведения</Heading>

      <Filter
        update={onFilterUpdate}
        remove={onFilterRemove}
        selectedKind={selectedKind}
        selectedValues={selectedValues}
      />

      <List
        renderItem={args => renderItem(args, props)}
        onRefresh={() => dispatch(loadList())}
        refreshing={isFetching}
        data={data}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={ListEmptyComponent}
      />

      <Alert center>…И ещё свыше 250 заведений до&nbsp;конца&nbsp;года</Alert>

      <FooterPusher />
    </View>
  );
}

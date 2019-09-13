import React from 'react';
import { RefreshControl, Dimensions } from 'react-native';
import styled, { css } from 'styled-components';
import useStoreon from 'storeon/react';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { Permissions } from 'react-native-unimodules';

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

const OrderSt = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 24;
`;

const Value = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  border-radius: 20;
  background-color: ${p => (p.isActive ? '#2CB4AA' : 'rgba(0,0,0,0.2)')};
  padding-horizontal: 12;
  padding-vertical: 8;
  margin-right: 8;
  display: flex;
  flex-direction: row;
  flex-basis: 50%;
  align-items: center;
`;

const ValueText = styled.Text`
  color: ${p => (p.isActive ? '#fff' : 'rgba(255,255,255,0.7)')};
  font-weight: bold;
  text-align: center;
  width: 100%;
`;

function Order() {
  const { orderBy, dispatch } = useStoreon('orderBy');

  function toggle(key) {
    if (orderBy === key) {
      return dispatch('places/orderBy', { key: null });
    }

    return dispatch('places/orderBy', { key });
  }

  return (
    <OrderSt>
      <Value isActive={orderBy === 'rating'} onPress={() => toggle('rating')}>
        <ValueText isActive={orderBy === 'rating'}>По рейтингу</ValueText>
      </Value>
      <Value
        isActive={orderBy === 'address.distance'}
        onPress={() => toggle('address.distance')}
      >
        <ValueText isActive={orderBy === 'rating'}>По удалённости</ValueText>
      </Value>
    </OrderSt>
  );
}

// const filterParents = {
//   street: 'district',
//   district: 'city',
//   city: 'country',
// };

// function filter(data, selected = [], selectedKind) {
//   const filtered = selected.find(({ kind }) => kind === selectedKind) || {};

//   return data.filter(({ address }) => address[selectedKind] === filtered.title);
// }

export default function Places({ ...props }) {
  const { dispatch = () => ({}), isFetching = false } = props;
  // const [selectedKind, updateKind] = React.useState([null, []]);
  // const [selectedValues, updateValues] = React.useState([]);
  // const [debug, setDebug] = React.useState({});
  const { places } = useStoreon('places');

  // React.useEffect(() => {
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  // }, [selectedKind]);

  // React.useEffect(() => {
  //   const effect = async () => {
  //     const isEnabled = await Location.hasServicesEnabledAsync();
  //     const { status } = await Permissions.askAsync(Permissions.LOCATION);

  //     // setDebug({ isEnabled, status });

  //     if (status === 'granted') {
  //       const res = await Location.getCurrentPositionAsync({});

  //       setDebug({ isEnabled, status, res });
  //     }
  //   };

  //   effect();
  // }, []);

  // function onFilterUpdate(kind, title, index) {
  //   const [, indexes] = selectedKind;
  //   const indexesPath = [...indexes, index];

  //   updateKind([kind, indexesPath]);
  //   updateValues([...selectedValues, { kind, title, indexesPath }]);
  // }

  // function onFilterRemove(kind, index) {
  //   const [, indexes] = selectedKind;

  //   updateKind([filterParents[kind], indexes.slice(0, index)]);
  //   return updateValues(selectedValues.slice(0, index));
  // }

  // const data = filter(places, selectedValues, selectedKind[0]) || places;
  const data = places;

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

      {/* <Alert white>debug: {JSON.stringify(debug, null, 2)}</Alert> */}

      {/* <Filter
        update={onFilterUpdate}
        remove={onFilterRemove}
        selectedKind={selectedKind}
        selectedValues={selectedValues}
      /> */}

      <Order />

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

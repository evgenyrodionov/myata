import React from 'react';
import {
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styled, { css } from 'styled-components';
import useStoreon from 'storeon/react';
import orderBy from 'lodash/orderBy';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { Permissions } from 'react-native-unimodules';

import OrigMapView, { Marker } from 'react-native-maps';

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

const List = styled.FlatList``;

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
  margin-bottom: 12;
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
  const { orderBy: orderByKey, dispatch } = useStoreon('orderBy');

  function toggle(key) {
    if (orderByKey === key) {
      return dispatch('places/orderBy', { key: null });
    }

    return dispatch('places/orderBy', { key });
  }

  return (
    <OrderSt>
      <Value
        isActive={orderByKey === 'rating'}
        onPress={() => toggle('rating')}
      >
        <ValueText isActive={orderByKey === 'rating'}>По рейтингу</ValueText>
      </Value>
      <Value
        isActive={orderByKey === 'address.distance'}
        onPress={() => toggle('address.distance')}
      >
        <ValueText isActive={orderByKey === 'rating'}>По удалённости</ValueText>
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

const MapView = styled(OrigMapView)`
  height: 128px;
  border-radius: 10;
  margin-bottom: 24;
`;

export default function Places({ ...props }) {
  const { dispatch = () => ({}), isFetching = false, navigation } = props;
  // const [selectedKind, updateKind] = React.useState([null, []]);
  // const [selectedValues, updateValues] = React.useState([]);
  // const [debug, setDebug] = React.useState({});
  const { places, orderBy: orderByKey } = useStoreon('places', 'orderBy');

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

  function getOrder() {
    if (orderByKey) {
      const direction = orderByKey === 'rating' ? 'desc' : 'asc';
      return orderBy(places, orderByKey, direction);
    }

    return orderBy(places, ['rating', 'address.distance'], ['desc', 'asc']);
  }

  const data = getOrder();

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

      <MapView
        initialRegion={{
          latitude: Number(55.7702233),
          longitude: Number(37.6327319),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={() => navigation.navigate('PlacesMap')}
      >
        {places.map(
          ({ id: placeId, title: placeTitle, address: placeAddress = {} }) => (
            <Marker
              key={placeId}
              coordinate={{
                latitude: Number(placeAddress.lat),
                longitude: Number(placeAddress.lon),
              }}
              title={`Мята ${placeTitle}`}
              image={require('./pin.png')}
              centerOffset={{ x: 0.5, y: 1 }}
            />
          ),
        )}
      </MapView>

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

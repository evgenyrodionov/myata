import React from 'react';
import { RefreshControl, Dimensions } from 'react-native';
import styled, { css } from 'styled-components';
import * as Haptics from 'expo-haptics';
import Card from './Card';
import { places } from '../data';
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

const Cities = styled.ScrollView`
  margin-top: 6;
  margin-bottom: 12;
`;

const City = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  border-radius: 20;
  background-color: ${p => (p.isActive ? '#fff' : 'rgba(0,0,0,0.2)')};
  padding-horizontal: 12;
  padding-vertical: 8;
  margin-right: 8;
`;

const CityText = styled.Text`
  color: ${p => (p.isActive ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.7)')};
`;

const cities = [
  {
    value: 'moscow',
    title: 'Москва',
    count: 4,
  },
  {
    value: 'yekaterinburg',
    title: 'Екатеринбург',
    count: 1,
  },
];

function renderItem({ item }, { navigation }) {
  return (
    <Item>
      <Card
        item={item}
        onPress={() => {
          navigation.navigate('PlaceDetails', {
            id: item.id,
            item,
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

export default function Places(props) {
  const { dispatch = () => ({}), isFetching = false } = props;
  const [selectedCities, updateCities] = React.useState([]);

  React.useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }, [selectedCities]);

  const refreshControl = (
    <RefreshControl
      onRefresh={() => dispatch(loadList())}
      enabled={!isFetching}
      // refreshing={isFetching && orders.length !== 0}
      refreshing={isFetching}
    />
  );

  function toggleCity(value) {
    if (selectedCities.includes(value)) {
      const filtered = selectedCities.filter(city => city !== value);

      return updateCities([...filtered]);
    }

    return updateCities([...selectedCities, value]);
  }

  const data = selectedCities.length > 0
    ? places.filter(({ city }) => selectedCities.includes(city))
    : places;

  return (
    <View refreshControl={refreshControl}>
      <Heading>Заведения</Heading>

      <Cities horizontal>
        {cities.map(({ value, title, count }) => (
          <City
            key={value}
            onPress={() => toggleCity(value)}
            isActive={selectedCities.includes(value)}
          >
            <CityText isActive={selectedCities.includes(value)}>
              {title} — {count}
            </CityText>
          </City>
        ))}
      </Cities>

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

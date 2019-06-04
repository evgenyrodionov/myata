import React from 'react';
import { RefreshControl, Dimensions } from 'react-native';
import styled, { css } from 'styled-components';
import Card from './Card';
import { places } from '../../data';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.ScrollView`
  width: ${deviceWidth};
  padding-horizontal: 16;
  padding-top: 36;
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
  margin-bottom: 34;
`;

const Item = styled.View`
  margin-bottom: 26;
`;

function loadList() {
  return [{ id: 1 }];
}

export default function Places(props) {
  const { dispatch = () => ({}), isFetching = false } = props;

  const renderItem = ({ item }, { navigation }) => (
    <Item>
      <Card
        item={item}
        onPress={() =>
          navigation.navigate('PlaceDetails', {
            id: item.id,
            item,
          })
        }
      />
    </Item>
  );

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
      <Heading>Все заведения</Heading>

      <List
        renderItem={args => renderItem(args, props)}
        onRefresh={() => dispatch(loadList())}
        refreshing={isFetching}
        data={places}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
}

import React from 'react';
import styled from 'styled-components';
import useStoreon from 'storeon/react';
import { Image } from 'react-native-expo-image-cache';
import { getPhotoUrl, onImageLoad } from '../../../utils/photos';

import {
  Card,
  Title as OrigTitle,
  Title2 as OrigTitle2,
  Title3 as OrigTitle3,
} from '../../../ui';

const Title = styled(OrigTitle)`
  margin-bottom: 24;
`;

const Title2 = styled(OrigTitle2)`
  font-size: 30px;
  line-height: 32px;
  margin-top: 0;
  margin-bottom: 12;
`;

const Title3 = styled(OrigTitle3)`
  margin-bottom: 6;
`;

const List = styled.FlatList`
  margin-bottom: 64;
`;

const Row = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  display: flex;
  flex-direction: column;
`;

const RowDescription = styled.View`
  margin-bottom: 12;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  margin-bottom: 4;
  align-items: flex-start;
`;

const Description = styled.Text`
  font-size: 14;
  color: rgba(255, 255, 255, 0.4);
`;

const Button = styled.View`
  background: #191919;
  border-radius: 20;
  display: flex;
  align-items: flex-start;
`;

const ButtonText = styled.Text`
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13;
  padding-vertical: 2;
  padding-horizontal: 8;
`;

const ItemSeparatorComponent = styled.View`
  height: 1;
  background: rgba(255, 255, 255, 0.1);
  margin-vertical: 22;
`;

const photoStyle = {
  height: 192,
  // marginVertical: 12,
  width: '100%',
  objectFit: 'contain',
  borderRadius: 10,
  backgroundColor: '#fff',
};

function renderProduct({ item: { title, uploadcareId, price } }) {
  return (
    <Row>
      <RowDescription>
        <Header>
          <Title3>{title}</Title3>

          <Button>
            <ButtonText>{price} ₽</ButtonText>
          </Button>
        </Header>
        <Description>
          Тестовое описание продукта, здесь может быть всё что угодно
        </Description>
      </RowDescription>

      <Image
        onLoad={onImageLoad}
        style={photoStyle}
        // resizeMethod="resize"
        resizeMode="cover"
        preview={{ uri: `${getPhotoUrl(uploadcareId)}-/resize/x48/` }}
        uri={`${getPhotoUrl(uploadcareId)}-/resize/x512/`}
      />
    </Row>
  );
}

export default function ({ navigation }) {
  const placeId = navigation.getParam('placeId');
  const { placesById = {} } = useStoreon('placesById');

  const place = placesById[placeId] || {};
  const { products = [] } = place;

  return (
    <Card onGoBack={navigation.goBack}>
      <Title>Меню</Title>

      {products.map(({ title: sectionTitle, items: sectionProducts }) => (
        <>
          <Title2>{sectionTitle}</Title2>

          <List
            data={sectionProducts}
            keyExtractor={({ title }) => title}
            renderItem={renderProduct}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </>
      ))}
    </Card>
  );
}

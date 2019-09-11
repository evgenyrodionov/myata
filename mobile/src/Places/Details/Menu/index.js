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
  flex-direction: row;
  align-items: center;
`;

const RowDescription = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 12;
`;

const ButtonText = styled.Text`
  color: rgba(255, 255, 255, 0.5);
`;

const ItemSeparatorComponent = styled.View`
  height: 16;
`;

const photoStyle = {
  height: 64,
  // marginVertical: 12,
  width: 64,
  objectFit: 'contain',
  borderRadius: 10,
  backgroundColor: '#fff',
};

function renderProduct({ item: { title, uploadcareId, price } }) {
  return (
    <Row>
      <Image
        onLoad={onImageLoad}
        style={photoStyle}
        // resizeMethod="resize"
        resizeMode="cover"
        preview={{ uri: `${getPhotoUrl(uploadcareId)}-/resize/x48/` }}
        uri={`${getPhotoUrl(uploadcareId)}-/resize/x512/`}
      />

      <RowDescription>
        <Title3>{title}</Title3>

        <ButtonText>{price} ₽</ButtonText>
      </RowDescription>
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

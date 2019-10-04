import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import OrigMapView, { Marker } from 'react-native-maps';
import useStoreon from 'storeon/react';
import { Card } from '../ui';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const MapView = styled(OrigMapView)`
  width: ${deviceWidth};
  height: ${deviceHeight};
`;

export default function () {
  const { places = [] } = useStoreon('placesById', 'places');

  return (
    <Card withoutPadding>
      <MapView
        initialRegion={{
          latitude: Number(55.7702233),
          longitude: Number(37.6327319),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
    </Card>
  );
}

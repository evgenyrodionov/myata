import React from 'react';
import { Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import * as Location from 'expo-location';
import styled from 'styled-components';
import OrigMapView, { Marker } from 'react-native-maps';
import useStoreon from 'storeon/react';
import { Card } from '../../ui';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

const MapView = styled(OrigMapView)`
  width: ${deviceWidth};
  height: ${deviceHeight};
`;

export default withNavigation(({ navigation }) => {
  const initial = navigation.getParam('initial');
  const { places = [] } = useStoreon('placesById', 'places');
  const [coords, setCoords] = React.useState(
    initial || {
      latitude: 55.77,
      longitude: 37.63,
    },
  );

  console.warn({ initial });

  React.useEffect(() => {
    async function effect() {
      try {
        const { coords: newCoords } = await Location.getCurrentPositionAsync(
          {},
        );
        setCoords(newCoords);
      } catch (e) {
        //
      }
    }

    if (!initial) effect();
  }, []);

  return (
    <Card withoutPadding>
      <MapView
        region={{
          latitude: Number(coords.latitude || 55),
          longitude: Number(coords.longitude || 37),
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
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
              image={require('../pin.png')}
              centerOffset={{ x: 0.5, y: 1 }}
              onPress={() =>
                navigation.navigate('PlaceDetails', { id: placeId })
              }
            />
          ),
        )}
      </MapView>
    </Card>
  );
});

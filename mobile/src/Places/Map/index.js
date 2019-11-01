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
  const id = navigation.getParam('id');
  const { places = [] } = useStoreon('placesById', 'places');
  const [calloutsShown, updateCalloutsStatus] = React.useState(false);
  const [markersRefs, updateRefs] = React.useState({});
  const [coords, setCoords] = React.useState(
    initial || {
      latitude: 55.77,
      longitude: 37.63,
    },
  );

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

    updateRefs(
      places.reduce(
        (acc, current) => ({ ...acc, [current.id]: React.createRef() }),
        {},
      ),
    );
  }, []);

  React.useEffect(() => {
    if (id !== undefined && (markersRefs[id] || {}).current !== undefined) {
      markersRefs[id].current.showCallout();
    }
  }, [markersRefs]);

  return (
    <Card withoutPadding>
      <MapView
        region={{
          latitude: Number(coords.latitude || 55),
          longitude: Number(coords.longitude || 37),
          latitudeDelta: id !== undefined ? 0.05 : 0.2,
          longitudeDelta: id !== undefined ? 0.05 : 0.2,
        }}
        // onRegionChange={(region) => {
        //   if (id === undefined) {
        //     if (Math.min(region.latitudeDelta, region.longitudeDelta) < 0.15 && !calloutsShown) {
        //       Object.values(markersRefs).map(marker => marker.current.showCallout());

        //       updateCalloutsStatus(true);
        //     }

        //     if (Math.min(region.longitudeDelta, region.latitudeDelta) > 0.2 && calloutsShown) {
        //       Object.values(markersRefs).map(marker => marker.current.hideCallout());

        //       updateCalloutsStatus(false);
        //     }
        //   }
        // }}
      >
        {places.map(
          ({ id: placeId, title: placeTitle, address: placeAddress = {} }) => (
            <Marker
              ref={markersRefs[placeId]}
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

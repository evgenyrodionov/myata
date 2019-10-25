import React from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components';
import * as Location from 'expo-location';
import { Permissions } from 'react-native-unimodules';
import qs from 'qs';

const AddressSt = styled.View``;

const Street = styled.Text`
  color: #fff;
  margin-top: 4;
  font-size: 22;
`;

const Subways = styled.View`
  margin-top: 12;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SubwayStation = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 16;
  margin-bottom: 4;
`;

const SubwayStationColor = styled.View`
  height: 12;
  width: 12;
  border-radius: 50;
  background-color: ${p => p.color};
  margin-right: 6;
`;

const SubwayStationTitle = styled.Text`
  color: #ddd;
`;

const SubwayStationDistance = styled.Text`
  color: #ddd;
  margin-left: 6;
`;

const averageMetersPerMinute = 83;

const taxiUrl = 'https://taxi-routeinfo.taxi.yandex.net/taxi_info';
const taxiClid = 'myata';
const taxiAffClid = '2356131';
const taxiApiKey = 'b0832f982d7a4b87830ce16775e711ee';

const Taxi = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  padding-horizontal: 8;
  padding-vertical: 8;
  background: #fff;
  border-radius: 10;
  margin-top: 12;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TaxiDescription = styled.View`
  margin-left: 8;
`;

const TaxiLogo = styled.Image`
  height: 48;
  width: 48;
`;

const TaxiCTA = styled.Text`
  font-size: 18;
  margin-bottom: 2;
  color: #111;
`;

const TaxiEstimates = styled.Text`
  color: #808080;
  font-size: 12;
`;

export default function Address({ item }) {
  const {
    subways = [], title, city, lat, lon,
  } = item.address || {};
  const [taxi, setTaxi] = React.useState({});

  React.useEffect(() => {
    async function effect() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === 'granted') {
        try {
          const { coords } = await Location.getCurrentPositionAsync({});

          const params = qs.stringify(
            {
              clid: taxiClid,
              apikey: taxiApiKey,
              rll: `${coords.longitude},${coords.latitude}~${lon},${lat}`,
            },
            { addQueryPrefix: true },
          );

          const res = await fetch(taxiUrl + params).then(r => r.json());

          setTaxi({
            price: res.options[0].price,
            time: res.time / 60,
            waiting: res.options[0].waiting_time / 60,
          });
        } catch (e) {
          //
        }
      }
    }
    effect();
  }, []);

  return (
    <AddressSt>
      <Street>
        {city}, {title}
      </Street>

      {taxi.price && (
        <Taxi
          onPress={() =>
            Linking.openURL(
              `https://3.redirect.appmetrica.yandex.com/route?end-lat=${lat}&end-lon=${lon}&ref=${taxiAffClid}&appmetrica_tracking_id=1178268795219780156&utm_source=widget`,
            )
          }
        >
          <TaxiLogo source={require('./yandex_taxi.png')} />

          <TaxiDescription>
            <TaxiCTA>Вызвать такси</TaxiCTA>
            <TaxiEstimates>
              ≈{parseFloat(taxi.price).toFixed()} ₽, ≈
              {parseFloat(taxi.time).toFixed()} мин, ≈
              {parseFloat(taxi.waiting).toFixed()} мин ожидания
            </TaxiEstimates>
          </TaxiDescription>
        </Taxi>
      )}

      <Subways>
        {subways.map(({ title: swTitle, color, walkMeters }) => (
          <SubwayStation key={swTitle}>
            <SubwayStationColor color={color} />
            <SubwayStationTitle>{swTitle}</SubwayStationTitle>

            <SubwayStationDistance>
              ≈{parseInt(walkMeters / averageMetersPerMinute, 10)} мин
            </SubwayStationDistance>
          </SubwayStation>
        ))}
      </Subways>
    </AddressSt>
  );
}

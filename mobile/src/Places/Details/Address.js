import React from 'react';
import styled from 'styled-components';

const AddressSt = styled.View``;

const Street = styled.Text`
  color: #fff;
  margin-top: 16;
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

export default function Address({ item }) {
  const { addressSubways = [], addressTitle } = item;

  return (
    <AddressSt>
      <Street>{addressTitle}</Street>

      <Subways>
        {addressSubways.map(({ title, color, walkMeters }) => (
          <SubwayStation key={title}>
            <SubwayStationColor color={color} />
            <SubwayStationTitle>{title}</SubwayStationTitle>

            <SubwayStationDistance>
              ≈{parseInt(walkMeters / averageMetersPerMinute, 10)} мин
            </SubwayStationDistance>
          </SubwayStation>
        ))}
      </Subways>
    </AddressSt>
  );
}

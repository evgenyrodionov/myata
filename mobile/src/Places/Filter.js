/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

// TODO change to FlatList because performance issues
const Filter = styled.ScrollView`
  margin-top: 6;
  margin-bottom: 12;
`;

const Value = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  border-radius: 20;
  background-color: ${p =>
    (p.isActive ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.2)')};
  padding-horizontal: 12;
  padding-vertical: 8;
  margin-right: 8;
  display: flex;
  flex-direction: row;
`;

const ValueText = styled.Text`
  color: ${p => (p.isActive ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.7)')};
`;

const ValueCount = styled.View`
  margin-left: 4;
  padding-horizontal: 6;
  padding-vertical: 2;
  border-radius: 10;
  background-color: ${p =>
    (p.isActive ? 'rgba(229,229,229,1)' : 'rgba(77,77,77,1)')};
  font-variant: tabular-nums;
`;

const ValueCountText = styled.Text`
  color: ${p => (p.isActive ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,0.7)')};
  font-size: 12;
`;

const data = [
  {
    title: 'Россия',
    kind: 'country',
    count: 5,
    siblings: [
      {
        title: 'Москва',
        kind: 'city',
        count: 4,
        siblings: [
          {
            title: 'Мещанский',
            kind: 'district',
            count: 1,
            siblings: [
              {
                kind: 'street',
                count: 1,
                title: 'ул Сретенка',
              },
            ],
          },
          {
            title: 'Пресненский',
            kind: 'district',
            count: 1,
            siblings: [
              {
                kind: 'street',
                count: 1,
                title: 'ул Рочдельская',
              },
            ],
          },
          {
            title: 'Рязанский',
            kind: 'district',
            count: 1,
            siblings: [
              {
                kind: 'street',
                count: 1,
                title: 'Рязанский пр-кт',
              },
            ],
          },
          {
            title: 'Головинский',
            kind: 'district',
            count: 1,
            siblings: [
              {
                kind: 'street',
                count: 1,
                title: 'Ленинградское шоссе',
              },
            ],
          },
        ],
      },
      {
        title: 'Екатеринбург',
        kind: 'city',
        count: 1,
        siblings: [
          {
            title: 'Верх-Исетский',
            kind: 'district',
            count: 1,
            siblings: [
              {
                kind: 'street',
                count: 1,
                title: 'ул Вайнера',
              },
            ],
          },
        ],
      },
    ],
  },
];

function getCountries() {
  return data;
}

function getCities(countryIndex) {
  return getCountries()[countryIndex];
}

function getDistricts(countryIndex, cityIndex) {
  return getCities(countryIndex).siblings[cityIndex];
}

function getStreets(countryIndex, cityIndex, districtIndex) {
  return getDistricts(countryIndex, cityIndex).siblings[districtIndex];
}

function getStreet(countryIndex, cityIndex, districtIndex, streetIndex) {
  return getStreets(countryIndex, cityIndex, districtIndex).siblings[
    streetIndex
  ];
}

function getValues(kind, indexes) {
  if (kind === 'country') {
    return getCities(...indexes);
  }

  if (kind === 'city') {
    return getDistricts(...indexes);
  }

  if (kind === 'district') {
    return getStreets(...indexes);
  }

  if (kind === 'street') {
    return { ...getStreet(...indexes), siblings: [] };
  }

  return { siblings: [] };
}

export default function ({
  update,
  remove,
  selectedKind: [selectedKind, selectedIndexes] = [],
  selectedValues = {},
}) {
  const values = selectedIndexes.length > 0
    ? getValues(selectedKind, selectedIndexes).siblings
    : data;

  return (
    <Filter horizontal showsHorizontalScrollIndicator={false}>
      {selectedValues.map(({ title, kind, indexesPath }, index) => (
        <Value key={title} isActive onPress={() => remove(kind, index)}>
          <ValueText isActive>{title}</ValueText>
          <ValueCount isActive>
            <ValueCountText isActive>
              {getValues(kind, indexesPath).count}
            </ValueCountText>
          </ValueCount>
        </Value>
      ))}

      {values.map(({ title, kind, count }, index) => (
        <Value key={title} onPress={() => update(kind, title, index)}>
          <ValueText>{title}</ValueText>
          <ValueCount>
            <ValueCountText>{count}</ValueCountText>
          </ValueCount>
        </Value>
      ))}
    </Filter>
  );
}

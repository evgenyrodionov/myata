import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useStoreon from 'storeon/react';
import keyBy from 'lodash/keyBy';

import { mapDocs as mapPartners } from './api';
import fb from '../firebase';

import {
  Card, Table, Thead, Tbody, Th, Tr, Td,
} from '../ui';

export default function () {
  const { dispatch, partners = [] } = useStoreon('partners', 'partnersById');

  React.useEffect(() => {
    fb.firestore()
      .collection('partners')
      .onSnapshot(async (docs) => {
        const mapped = await mapPartners(docs);
        const byId = keyBy(mapped, 'id');

        dispatch('partners/update', {
          partners: Object.values(mapped).map(({ id }) => id),
          byId,
        });
      });
  }, []);

  return (
    <Card
      title="Партнёры"
      buttonLink="/partners/create"
      buttonTitle="Добавить партнёра"
    >
      <Table>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Владелец</Th>
            <Th>Заведения</Th>
            <Th>Договор</Th>
            <Th>Лояльность</Th>
          </Tr>
        </Thead>
        <Tbody>
          {partners.map((id) => {
            const {
              owner = {},
              places = [],
              contractDates = {},
              ...partner
            } = partners[id];

            return (
              <Tr>
                <Td>{partner.contractId}</Td>
                <Td>
                  {owner.displayName} (
                  <a href={`tel:${owner.phoneNumber}`}>{owner.phoneNumber}</a>)
                </Td>
                <Td>
                  {places.map(place => (
                    <Link to={`/places/${place.id}`}>{place.title}</Link>
                  ))}
                </Td>
                <Td>
                  {contractDates.from.seconds * 1000}−
                  {contractDates.to.seconds * 1000}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}

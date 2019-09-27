import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useStoreon from 'storeon/react';
import keyBy from 'lodash/keyBy';

import { mapDocs as mapPartners } from './api';
import fb from '../firebase';

import { Card } from '../ui';

const Table = styled.table`
  width: 100%;
`;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Th = styled.th``;
const Tr = styled.tr``;
const Td = styled.td``;

// - владелец
// - его контактный телефон
// - номер договора
// - адрес мяты
// - какая форма организации (ООО, ИП или то, и то)
// - какая дата оплаты франшизы
// - документы (сканы) - акты, договор франшизы, договоры по федеральным контрактам (яндекс, санинбев и др.)
//  - дата окончания договора
// - лояльность партнера (3 параметра - не лоялен, нейтрально, лояльный)

export default function() {
  const { dispatch, partnersById = {}, partners = [] } = useStoreon(
    'partners',
    'partnersById',
  );

  React.useEffect(() => {
    fb.firestore()
      .collection('partners')
      .onSnapshot(async docs => {
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
          {partners.map(id => {
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

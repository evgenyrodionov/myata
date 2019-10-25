import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import pluralize from 'pluralize-ru';
import useStoreon from 'storeon/react';
import keyBy from 'lodash/keyBy';

import { mapDocs as mapUsers } from './api';
import fb from '../firebase';

import {
  Card,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Label as OrigLabel,
} from '../ui';

const Label = styled(OrigLabel)`
  margin-right: 4px;
`;

const rolesDict = {
  admin: 'УК',
  partner: 'Партнёр',
};

export default function () {
  const { dispatch, usersById = {}, users = [] } = useStoreon(
    'users',
    'usersById',
  );

  React.useEffect(() => {
    fb.firestore()
      .collection('users')
      .onSnapshot(async (docs) => {
        const mapped = await mapUsers(docs);
        const byId = keyBy(mapped, 'id');

        dispatch('users/update', {
          users: Object.values(mapped).map(({ id }) => id),
          byId,
        });
      });
  }, []);

  return (
    <Card title="Люди">
      <Table>
        <Thead>
          <Tr>
            <Th width="10%">ФИО</Th>
            <Th width="10%">Телефон</Th>
            <Th width="10%">Баланс</Th>
            <Th width="10%">Кэшбэк</Th>
            <Th width="10%">Друзей</Th>
            <Th width="10%">Потрачено</Th>
            <Th width="10%">Роли</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((id) => {
            const { formattedPhoneNumber, roles = {}, ...user } = usersById[id];

            return (
              <Tr key={id}>
                <Td>{user.displayName || '—'}</Td>
                <Td>{formattedPhoneNumber}</Td>
                <Td>{user.balance} баллов</Td>
                <Td>{user.cashback}%</Td>
                <Td>
                  {pluralize(
                    user.friends.length,
                    'не привёл',
                    '%d друг',
                    '%d друга',
                    '%d друзей',
                  )}
                </Td>
                <Td>{user.balance} ₽</Td>
                <Td>
                  {Object.keys(roles).map(role => (
                    <Label>{rolesDict[role]}</Label>
                  ))}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}

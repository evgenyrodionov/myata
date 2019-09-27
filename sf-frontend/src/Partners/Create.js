import React from 'react';
import styled from 'styled-components';

import { Card, TextOrInput, SaveButton } from '../ui';

const ActionsRow = styled.div`
  margin-top: 36px;
  margin-bottom: 36px;
`;

export default function() {
  const [state, setState] = React.useState({});

  return (
    <>
      <Card title="Новый партнёр">
        <TextOrInput
          isEdit
          value={state.contractId}
          placeholder="Номер договора"
          onChange={e => setState({ ...state, contractId: e.target.value })}
        />
      </Card>

      <ActionsRow>
        <SaveButton>Сохранить</SaveButton>
      </ActionsRow>
    </>
  );
}

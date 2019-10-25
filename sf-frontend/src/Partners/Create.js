import React from 'react';
import styled from 'styled-components';

import { Card, TextOrInput, SaveButton } from '../ui';

const ActionsRow = styled.div`
  margin-top: 36px;
  margin-bottom: 36px;
`;

// Отправляю корректировки по полям для системы франчайзи:

// 1. Владелец (ФИО)
// 2. Форма организации (ООО, ИП или возможность несколько выбрать)
// 3. Номер договора (и прикрепленный договор с превью и возможностью скачать)
// 4. Паушальный взнос (сумма)
// 5. Дата оплаты (и пересчет, сколько осталось до конца завершения договора)
// 6. Адрес
// 7. Контракты (% пользования контрактами, я чуть подробнее распишу по пересчету. Документы по контрактам, акты по оплате контрактов с превью)
// и добавить возможность по контрактам добавлять комментарии, с кем работает, а с кем нет, статус
// 8. Подключение к мобильному приложению
// 10. Маркетинговый сбор (это на будущее поле)
// 11. Лояльность партнера (не лоялен, лоялен, нейтрально)

export default function () {
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

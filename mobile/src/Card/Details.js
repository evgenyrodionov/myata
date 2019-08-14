import React from 'react';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';
import format from 'date-fns/format';
import locale from 'date-fns/locale/ru';
import { QRCode } from 'react-native-custom-qr-codes';
import {
  Card as UICard,
  Title as OrigTitle,
  Title2 as OrigTitle2,
} from '../ui';
import logoImg from '../images/logo_512_with_padding.png';

const Title = styled(OrigTitle)`
  margin-bottom: 14;
`;

const Title2 = styled(OrigTitle2)`
  font-size: 32;
  line-height: 44;
  margin-bottom: 6;
  margin-top: 12;
`;

const FlatList = styled.FlatList`
  margin-bottom: 36;
`;

const Separator = styled.View`
  border-bottom-width: 1;
  border-bottom-color: rgba(255, 255, 255, 0.04);
  border-style: solid;
  margin-vertical: 8;
`;

const BalanceRow = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const BalancePlace = styled.View``;

const BalancePlaceTitle = styled.Text`
  color: #fff;
  font-size: 24;
`;

const BonusesTitle = styled.Text`
  font-variant: tabular-nums;
  font-size: 24;
  color: #fff;
`;

const BonusesSubtitle = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4;
`;

function renderBalance({ item }) {
  return (
    <BalanceRow>
      <BalancePlace>
        <BalancePlaceTitle>{item.place.title}</BalancePlaceTitle>
        <BonusesSubtitle>{item.balance} баллов</BonusesSubtitle>
      </BalancePlace>

      <BonusesTitle>{item.cashback}%</BonusesTitle>
    </BalanceRow>
  );
}

const BalanceSt = styled.View`
  margin-bottom: 48;
`;

const BalanceDescription = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  font-size: 14;
  margin-bottom: 16;
`;

const FAQ = styled.View`
  padding-horizontal: 16;
  padding-vertical: 16;
  background-color: #fff;
  border-radius: 10;
`;

const FAQTitle = styled(OrigTitle2)`
  font-size: 24;
  line-height: 33;
  margin-bottom: 10;
  margin-top: 0;
  color: #111;
`;

const FAQDescription = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  font-size: 15;
  margin-bottom: 16;
`;

function renderFAQDescription({ superBalance }) {
  const first = superBalance[0];
  const exampleSum = 1000;
  const exampleCashback = first.cashback / 100;
  const superHalf = parseInt(exampleSum * exampleCashback * 0.7, 10);
  const commonHalf = parseInt(exampleSum * exampleCashback * 0.3, 10);

  return (
    <>
      Пример: у&nbsp;вас кэшбэк {first.cashback}% в&nbsp;Мяте{' '}
      {first.place.title}, при счёте на&nbsp;{exampleSum} ₽ общими будут{' '}
      {commonHalf} баллов, а&nbsp;супер-баллами&nbsp;— {superHalf}.
    </>
  );
}

function Balance({ user: { superBalance = [], balance, cashback } }) {
  const hasSuperBalance = superBalance.length > 0;

  const title = hasSuperBalance ? (
    <>
      У&nbsp;вас {balance} общих баллов и&nbsp;{cashback}% кэшбэка
    </>
  ) : (
    <>
      У&nbsp;вас {balance} баллов и&nbsp;{cashback}% кэшбэка
    </>
  );

  const description = hasSuperBalance ? (
    <>
      Общие баллы можно потратить во&nbsp;всех Мятах, когда будете закрывать
      счёт&nbsp;— покажите официанту карту или скажите свой номер телефона.
    </>
  ) : (
    <>
      Баллы можно потратить во&nbsp;всех Мятах; когда будете закрывать
      счёт&nbsp;— покажите официанту карту или скажите свой номер телефона.
    </>
  );

  return (
    <BalanceSt>
      <Title>{title}</Title>
      <BalanceDescription>{description}</BalanceDescription>

      {hasSuperBalance && (
        <>
          <Title2>Супер-баллы 🌟</Title2>
          <BalanceDescription>
            В&nbsp;этих Мятах вы&nbsp;&mdash; любимый клиент и&nbsp;поэтому
            у&nbsp;вас индивидуальные условия
          </BalanceDescription>

          <FlatList
            data={superBalance}
            keyExtractor={({ place }) => String(place.title)}
            renderItem={renderBalance}
            ItemSeparatorComponent={Separator}
          />

          <FAQ>
            <FAQTitle>Как начисляются супер-баллы 🌟, а как — общие?</FAQTitle>
            <FAQDescription>
              Когда вы&nbsp;закрываете счёт в&nbsp;любимой Мяте,
              то&nbsp;из&nbsp;кэшбэка в&nbsp;этой Мяте 70% уходят на&nbsp;её
              баланс, а&nbsp;30%&nbsp;— на&nbsp;общий.
            </FAQDescription>
            <FAQDescription>
              {renderFAQDescription({ superBalance })}
            </FAQDescription>
          </FAQ>
        </>
      )}
    </BalanceSt>
  );
}

const Visit = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const VisitDescription = styled.View``;

const VisitPlace = styled.Text`
  color: #fff;
  font-size: 18;
`;

const VisitDate = styled.Text`
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4;
`;

const VisitBalanceChange = styled.Text`
  font-variant: tabular-nums;
  color: #fff;
  font-size: 24;
`;

const renderBalanceChange = ({ added, decreased }) => {
  if (added) return `+${added}`;
  if (decreased) return `−${decreased}`;

  return null;
};

function renderVisit({ item }) {
  return (
    <Visit>
      <VisitDescription>
        <VisitPlace>{item.place.title}</VisitPlace>
        <VisitDate>
          {format(item.createdAt, 'D MMMM [в] HH:mm', { locale })}
        </VisitDate>
      </VisitDescription>
      <VisitBalanceChange>{renderBalanceChange(item)}</VisitBalanceChange>
    </Visit>
  );
}

const VisitsSt = styled.View``;

function Visits({ user: { visits = [] } }) {
  return (
    <VisitsSt>
      <Title>Мои посещения</Title>

      <FlatList
        data={orderBy(visits, 'createdAt', 'desc')}
        keyExtractor={({ createdAt }) => String(createdAt)}
        renderItem={renderVisit}
        ItemSeparatorComponent={Separator}
      />
    </VisitsSt>
  );
}

const CodeWrapper = styled.View`
  display: flex;
  align-items: center;
  margin-top: 16;
  margin-bottom: 42;
`;

export default function ({ navigation }) {
  const user = navigation.getParam('user');

  return (
    <UICard onGoBack={() => navigation.goBack()}>
      <CodeWrapper>
        <QRCode
          color="#20B4AB"
          backgroundColor="transparent"
          logo={logoImg}
          logoSize={64}
          size={192}
          content={user.formattedPhoneNumber}
          codeStyle="circle"
          outerEyeStyle="circle"
          innerEyeStyle="circle"
        />
      </CodeWrapper>

      {user && <Balance user={user} />}
      {user && <Visits user={user} />}
    </UICard>
  );
}

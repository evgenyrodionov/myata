import React from 'react';
import styled from 'styled-components';
import orderBy from 'lodash/orderBy';
import format from 'date-fns/format';
import locale from 'date-fns/locale/ru';
import { QRCode } from 'react-native-custom-qr-codes';
import { Card as UICard, Title as OrigTitle } from '../ui';
import logoImg from '../images/logo_512_with_padding.png';

const Title = styled(OrigTitle)`
  margin-bottom: 14;
`;

const FlatList = styled.FlatList``;

const Separator = styled.View`
  border-bottom-width: 1;
  border-bottom-color: rgba(255, 255, 255, 0.04);
  border-style: solid;
  margin-vertical: 8;
`;

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

export default function({ navigation }) {
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

      {user && <Visits user={user} />}
    </UICard>
  );
}

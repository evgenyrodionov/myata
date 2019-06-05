import React from 'react';
import { Dimensions, RefreshControl } from 'react-native';
// import firebase from 'react-native-firebase';
import AnimateNumber from 'react-native-animate-number';
import styled, { css } from 'styled-components';
import logoImg from '../../images/logo_103.png';

const { width: deviceWidth } = Dimensions.get('window');

const View = styled.ScrollView`
  width: ${deviceWidth};
  padding-horizontal: 16;
  padding-top: 36;
`;

const FeedSt = styled.View`
  margin-top: 56;
`;

const Heading = styled.Text`
  font-size: 36;
  font-weight: bold;
  margin-bottom: 8;
  color: #fff;

  ${p =>
    p.center
    && css`
      text-align: center;
    `}
`;

const CardView = styled.View``;

const Alert = styled.View`
  padding-vertical: 8;
  padding-bottom: 16;
  padding-horizontal: 16;
  border-radius: 10;

  background: #eee;
`;

const AlertText = styled.Text`
  color: #171717;
  margin-top: 8;
  font-size: 16;
  text-align: center;
`;

const CardSt = styled.TouchableOpacity`
  background: #000;
  padding-horizontal: 16;
  padding-vertical: 10;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 10;
`;

const CardImage = styled.Image`
  width: 44;
  height: 44;
`;

const CardState = styled.View``;

const CardText = styled.Text`
  text-align: right;
  color: #fff;
`;

const CardBalance = styled(CardText)`
  font-size: 12;
  line-height: 12;
  margin-bottom: 2;
`;

const CardCashback = styled(CardText)`
  font-size: 26;
`;

function loadList() {
  return [];
}

function Card() {
  return (
    <CardSt>
      <CardImage source={logoImg} />

      <CardState>
        <CardBalance>
          <AnimateNumber value={2438} formatter={val => parseInt(val, 10)} />{' '}
          баллов
        </CardBalance>
        <CardCashback>3%</CardCashback>
      </CardState>
    </CardSt>
  );
}

// eslint-disable-next-line react/prefer-stateless-function
export default class Feed extends React.Component {
  render() {
    const { dispatch = () => ({}), isFetching = false } = this.props;

    const refreshControl = (
      <RefreshControl
        onRefresh={() => dispatch(loadList())}
        enabled={!isFetching}
        // refreshing={isFetching && orders.length !== 0}
        refreshing={isFetching}
      />
    );

    return (
      <View refreshControl={refreshControl}>
        <CardView>
          <Heading>Моя карта</Heading>

          <Card />
        </CardView>

        <FeedSt>
          <Heading>Лента</Heading>

          <Alert>
            <AlertText>
              Добавьте в избранное несколько заведений и мы покажем ленту их
              событий
            </AlertText>
          </Alert>
        </FeedSt>
      </View>
    );
  }
}

import React from 'react';
import styled from 'styled-components';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import ruLocale from 'date-fns/locale/ru';
import getDay from 'date-fns/get_day';
import isFuture from 'date-fns/is_future';
import format from 'date-fns/format';
import capitalize from 'capitalize';

import { IconHeart } from '../../ui';

const StCard = styled.View`
  padding-horizontal: 16;
  padding-top: 20;
  padding-bottom: 16;
  height: 172;

  border-radius: 10;
  background: rgba(17, 17, 17, 0.6);
  /* shadow-color: #000;
  shadow-offset: 0px 20px;
  shadow-opacity: 0.58;
  shadow-radius: 16;
  elevation: 24; */
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 32;
  line-height: 26;
  font-weight: 600;
  padding-top: 4;
  color: #fff;
`;

const LikeButton = styled.TouchableOpacity`
  margin-left: 8;
  margin-right: -16;
  margin-top: -16;

  padding-horizontal: 16;
  padding-vertical: 16;
`;

const Footer = styled.View`
  flex: 1;
  /* justify-content: space-between;
  flex-direction: row; */
  position: absolute;
  bottom: 8;
  left: 16;
`;

const Address = styled.Text`
  font-size: 14;
  font-weight: 400;
  color: #fff;
`;

const DateHelper = styled.Text`
  font-size: 12;
  color: ${p => p.color};
  margin-top: 6;
`;

const ImageBackground = styled.ImageBackground`
  border-radius: 10;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const SpecialOffer = styled.View`
  padding-vertical: 16;
  padding-horizontal: 16;
  background: #111;
  border-bottom-left-radius: 10;
  border-bottom-right-radius: 10;
`;

const SpecialOfferText = styled.Text`
  color: #7dce56;
  font-size: 12;
`;

function renderSpecialOffer({ item }) {
  const today = new Date();
  const { events = [] } = item;

  if (item.specialOffer || events.length > 0) {
    if (item.specialOffer) {
      return (
        <SpecialOffer>
          <SpecialOfferText>🏷 {item.specialOffer}</SpecialOfferText>
        </SpecialOffer>
      );
    }

    if (events.length > 0) {
      const { title, eventAt } = events[0];

      if (isFuture(eventAt)) {
        return (
          <SpecialOffer>
            <SpecialOfferText>
              🏷{' '}
              {capitalize(
                distanceInWordsStrict(today, eventAt, {
                  locale: ruLocale,
                  addSuffix: true,
                }),
              )}{' '}
              состоится {title}
            </SpecialOfferText>
          </SpecialOffer>
        );
      }

      return null;
    }

    return null;
  }

  return null;
}

export default function Card({ item, onPress }) {
  const [isLiked, toggle] = React.useState(false);
  const today = new Date();
  const todayDayOfWeek = getDay(today);

  const todayWH = item.workingHours[todayDayOfWeek];
  const openingAt = format(today, `YYYY-MM-DD ${todayWH[0]}`);
  // const closingAt = format(today, `YYYY-MM-DD ${todayWH[1]}`);

  const isOpeningInFuture = isFuture(openingAt);
  // const isClosingInFuture = isFuture(closingAt);

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: item.coverImg }}
        imageStyle={{ borderRadius: 10 }}
      >
        <StCard>
          <Header>
            <Title>{item.title}</Title>
            <LikeButton onPress={() => toggle(!isLiked)}>
              <IconHeart color={isLiked ? '#E74C3C' : '#fff'} />
            </LikeButton>
          </Header>
          <Footer>
            <Address>{item.addressTitle}</Address>

            {isOpeningInFuture ? (
              <DateHelper color="#bd8851">
                🕙 Откроется{' '}
                {distanceInWordsStrict(today, openingAt, {
                  locale: ruLocale,
                  addSuffix: true,
                })}{' '}
                в {todayWH[0]}
              </DateHelper>
            ) : (
              <DateHelper color="#7dce56">🕙 Открыто</DateHelper>
            )}
          </Footer>
        </StCard>

        {renderSpecialOffer({ item })}
      </ImageBackground>
    </TouchableOpacity>
  );
}

import React from 'react';
import styled from 'styled-components';
import { featuresTitles } from '../../data';
import * as FeaturesIcons from '../../ui/icons/features';

const featuresToIcons = {
  parking: FeaturesIcons.Parking,
  vip_rooms: FeaturesIcons.Vip,
  summer_terrace: FeaturesIcons.SummerTerrace,
  business_lunches: FeaturesIcons.BusinessLunch,
  breakfast: FeaturesIcons.Breakfast,
  own_kitchen: FeaturesIcons.OwnKitchen,
  light_snacks_or_desserts: FeaturesIcons.Snacks,
  own_food: FeaturesIcons.OwnFood,
  fast_delivery_from_partners: FeaturesIcons.PartnersDelivery,
  hard_liquors: FeaturesIcons.HardAlcohol,
  corkage_fee: FeaturesIcons.CorkageFee,
  ps4: FeaturesIcons.PlayStation,
  board_games: FeaturesIcons.BoardGames,
  live_broadcasts: FeaturesIcons.LiveBroadcasts,
  parties: FeaturesIcons.Parties,
  free_wifi: FeaturesIcons.Wifi,
  round_the_clock: FeaturesIcons.RoundTheClock,
};

const kindToColor = {
  edition: '#E79F6D',
  default: '#20B4AB',
  platinum: '#FFFFFF',
};

function renderIcon({ value, kind, ...props }) {
  if (featuresToIcons[value]) {
    return React.createElement(featuresToIcons[value], {
      size: 36,
      color: kindToColor[kind] || kindToColor.default,
      withGradient: true,
      ...props,
    });
  }

  return null;
}

const HighlightsSt = styled.FlatList`
  margin-right: -16;
  margin-top: 24;
`;

const Highlight = styled.TouchableOpacity.attrs({ activeOpacity: 0.8 })`
  margin-right: 12;
  width: 96;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.View`
  border-color: ${p => kindToColor[p.kind] || '#20B4AB'};
  border-width: 1;
  border-radius: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64;
  height: 64;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 16;
  text-align: center;
  margin-top: 8;
`;

function renderItem({ item: feature, kind }) {
  return (
    <Highlight>
      <IconWrapper kind={kind}>
        {renderIcon({ value: feature, kind })}
      </IconWrapper>
      <Title>{featuresTitles[feature]}</Title>
    </Highlight>
  );
}

export default function Highlights({ item: place }) {
  return (
    <HighlightsSt
      horizontal
      showsHorizontalScrollIndicator={false}
      data={place.highlights}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }) => renderItem({ item, kind: place.kind })}
    />
  );
}

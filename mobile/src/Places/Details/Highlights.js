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

function renderIcon({ value, ...props }) {
  if (featuresToIcons[value]) {
    return React.createElement(featuresToIcons[value], {
      size: 48,
      ...props,
    });
  }

  return null;
}

const HighlightsSt = styled.FlatList`
  margin-left: -16;
  margin-right: -16;
  padding-horizontal: 16;
  margin-top: 24;
`;

const Highlight = styled.TouchableOpacity.attrs({ activeOpacity: 0.9 })`
  margin-right: 12;
  width: 144;
  background-color: #fff;
  height: 144;
  border-radius: 10;
  padding-horizontal: 16;
  padding-vertical: 16;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HighlightTitle = styled.Text`
  color: #111;
  font-weight: bold;
  font-size: 14;
`;

function renderItem({ item: feature }) {
  return (
    <Highlight>
      <HighlightTitle>{featuresTitles[feature]}</HighlightTitle>
      {renderIcon({ value: feature })}
    </Highlight>
  );
}

export default function Highlights({ item }) {
  return (
    <HighlightsSt
      horizontal
      showsHorizontalScrollIndicator={false}
      data={item.highlights}
      keyExtractor={(_, index) => String(index)}
      renderItem={renderItem}
    />
  );
}

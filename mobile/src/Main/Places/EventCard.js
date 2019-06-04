import React from 'react';
import styled from 'styled-components';
import ruLocale from 'date-fns/locale/ru';
import format from 'date-fns/format';

const StCard = styled.View`
  padding-horizontal: 16;
  padding-top: 20;
  padding-bottom: 16;
  height: 172;
  width: 100%;

  border-radius: 10;
  background: rgba(17, 17, 17, 0.6);
  /* shadow-color: #000;
  shadow-offset: 0px 20px;
  shadow-opacity: 0.58;
  shadow-radius: 16;
  elevation: 24; */
`;

const Title = styled.Text`
  font-size: 36;
  line-height: 36;
  font-weight: 600;
  color: #fff;
`;

const Footer = styled.View`
  flex: 1;
  /* justify-content: space-between;
  flex-direction: row; */
  position: absolute;
  bottom: 8;
  left: 16;
`;

const DateHelper = styled.Text`
  font-size: 14;
  color: ${p => p.color};
  margin-top: 6;
`;

const ImageBackground = styled.ImageBackground`
  border-radius: 10;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const defaultDateFormat = eventAt =>
  format(eventAt, 'DD MMMM в HH:MM', { locale: ruLocale });

export default function EventCard({
  item,
  dateFormat = defaultDateFormat,
  onPress = () => ({}),
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: item.coverImg }}
        imageStyle={{ borderRadius: 10 }}
      >
        <StCard>
          <Title>{item.title}</Title>
          <Footer>
            <DateHelper color="#fff">{dateFormat(item.eventAt)}</DateHelper>
          </Footer>
        </StCard>
      </ImageBackground>
    </TouchableOpacity>
  );
}

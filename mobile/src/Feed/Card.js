import React from 'react';
import { Animated, Linking, Dimensions } from 'react-native';
import styled from 'styled-components';
import ruLocale from 'date-fns/locale/ru';
import format from 'date-fns/format';
import * as Haptics from 'expo-haptics';
import Markdown from 'react-native-easy-markdown';
import { Image } from 'react-native-expo-image-cache';

// import Typograf from 'typograf';
import * as animateScale from '../utils/animateScale';
import { getPhotoUrl, onImageLoad } from '../utils/photos';

const { width: deviceWidth } = Dimensions.get('window');
// const tp = new Typograf({ locale: ['ru', 'en-US'] });

const StCard = styled.View`
  display: flex;
  flex-direction: column;
`;

const Header = styled.View`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  /* align-items: flex-start; */
`;

const Title = styled.Text`
  font-size: 24;
  line-height: 30;
  font-weight: 600;
  color: #fff;
`;

const Description = styled(Markdown)`
  margin-top: 14;
`;

const NewsDate = styled.Text`
  font-size: 14;
  color: #808080;
  margin-bottom: 4;
`;

const TouchableOpacity = styled.TouchableOpacity``;

const Button = styled.TouchableOpacity`
  width: 100%;
  border-width: 1;
  border-color: rgba(255, 255, 255, 0.2);
  border-radius: 20;
  padding-vertical: 14;
  padding-horizontal: 22;
  margin-top: 8;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16;
`;

const defaultDateFormat = eventAt =>
  format(eventAt, 'DD MMMM в HH:MM', { locale: ruLocale });

const tempDescriptions = {
  q6LH1HJbzblw8peq2Aqm:
    'То, чего вы так ждали (и мы!) — наш первый тестовый запуск.\n\nКаждый день мы будем улучшать приложение, но уже — добро пожаловать в Мятную семью 🤗',
  rqQSbkbZwMrXvt2tgEA6:
    'Совсем скоро мы запустим крутой мятный сайт. Еще на шаг ближе к нашим гостям!\n\n * Вы сможете найти Мяту практически в любом уголке России\n * Удобная система бронирования для каждой Мяты\n * Вечеринки и мероприятия\n * Анонсы событий\n * Фишки каждого нашего заведения',
  fORadsDM2XBF8vxxUWRD:
    '* Мята Lounge насчитывает более 200 заведений по всей России и странам СНГ\n* Каждый месяц нас посещают более 200 000 гостей\n* Мы открыты более, чем в 120 городаx',
  TQki3q1eesZK1fna4YOK:
    'Да, мы это сделали!\n\nТеперь вы можете следить за всеми новостями сети в нашем официальном аккаунте [@myata.official](https://instagram.com/myata.official)',
};

const photoStyle = {
  height: 320,
  marginVertical: 12,
  marginLeft: -16,
  width: deviceWidth + 16 * 2,
};

const markdownStyles = {
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    color: '#fff',
  },
};

export default function EventCard({
  item,
  dateFormat = defaultDateFormat,
  onPress: parentOnPress = () => ({}),
}) {
  const scaleInAnimated = new Animated.Value(0);
  // const shadowElevationAnimated = new Animated.Value(11);

  function onPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    parentOnPress();
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      onPressIn={() => animateScale.pressInAnimation(scaleInAnimated)}
      onPressOut={() => animateScale.pressOutAnimation(scaleInAnimated)}
      style={animateScale.getScaleTransformationStyle(scaleInAnimated)}
    >
      <Animated.View>
        <StCard>
          <Header>
            <NewsDate>{dateFormat(item.eventAt)}</NewsDate>
            <Title>{item.title}</Title>
          </Header>
          <Description markdownStyles={markdownStyles}>
            {tempDescriptions[item.id].trim()}
          </Description>

          {item.coverId && (
            <Image
              onLoad={onImageLoad}
              style={photoStyle}
              // resizeMethod="resize"
              resizeMode="cover"
              preview={{ uri: `${getPhotoUrl(item.coverId)}-/resize/x48/` }}
              uri={`${getPhotoUrl(item.coverId)}-/resize/x512/`}
            />
          )}

          {item.cta && (
            <Button onPress={() => Linking.openURL(item.cta.link)}>
              <ButtonText>{item.cta.text}</ButtonText>
            </Button>
          )}
        </StCard>
      </Animated.View>
    </TouchableOpacity>
  );
}

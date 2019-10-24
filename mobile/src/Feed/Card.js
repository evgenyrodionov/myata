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

const ListBullet = styled.View`
  width: 5;
  height: 5;
  background: #fff;
  border-radius: 50;
  margin-right: 6;
  margin-top: 9;
  align-self: flex-start;
`;

function renderListBullet() {
  return <ListBullet />;
}

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
  HPUDcde5ZUrLsqvuCYeM: `В конце сентября Мята Lounge откроет свои двери в Зеленограде!\n
* Большой выбор чая и напитков\n
* Невероятные миксы от ведущиx кальянныx мастеров\n
* Дизайн и атмосфера\n
* Настольные игры иии.. еще больше подробностей в Инстаграме
[@myata_zelenograd_georgievskiy](https://www.instagram.com/myata_zelenograd_georgievskiy/)\n
\n\n
г. Зеленоград, Георгиевский проспект 37 корпус.2
`,
  jIiNxvNsLg5VlhIUwfcV: `Любите футбол? Смотрите прямые трансляции в сети Мята Lounge!\n
\n\n
**Расписание Лиги Чемпионов:**\n
* ТУР 2: 1-2 октября\n
* ТУР 3: 22-23 октября\n
* ТУР 4: 5-6 ноября\n
* ТУР 5: 26-27 ноября\n
* ТУР 6: 11-11 декабря\n
\n
**Расписание Лиги Европы:**\n
* ТУР 2: 3 октября\n
* ТУР 3: 24 октября\n
* ТУР 4: 6-7 ноября\n
* ТУР 5: 27 28 ноября\n
* ТУР 6: 12 декабря\n
\n
Следите за анонсами каждого тура!`,
  wn8IwfxXjIHSuMGSMcVr: `5 октября состоится официальное открытие новой Мята Lounge по адресу ул. Преображенский Вал, 17стр91\n
\n
Начало программы: 21.00\n
\n
В программе:\n
* DJ\n
* Торт\n
* Фотограф\n
* Конкурсы и розыгрыши и др.`,
  jMZZXJxUVi2sEgfwCh5P: `Приходи на трансляцию матчей в Мята Lounge:\n
* 28 сентября 14:00 Крылья Советов – Тамбов\n
* 28 сентября 16:30 Ростов – Динамо\n
* 28 сентября 19:00 Локомотив – Зенит\n
* 29 сентября 14:00 Рубин – Уфа\n
* 29 сентября 16:30 Спартак – Оренбург\n
* 29 сентября 19:00 Краснодар - Арсенал \n
* 30 сентября 19:30 Сочи - Ахмат`,
  TmQ7SWVtClLlt5Y92FLU: `Поздравляем с открытием новую Мята Lounge в ТРЦ Афимолл Сити!\n
Обязательно заглядывайте расслабиться после долгого шоппинга!\n
Режим работы: с 10:00 до 24:00 каждый день`,
  eQkVsd6A2owJyrtcV0jP: `Жаркий микс популярных современных и старых зажигательных треков, который растопит сердца и согреет лучше любого отопления!\n
\n
Начало в 22.00\n
\n
Бронируйте стол и следите за новостями в инстаграме [@myata_edition](https://instagram.com/myata_edition?igshid=ggqwt7rc8rxz)`,
  TFwVqsOZOGLcgbdQcN69: `Мята попала на самый популярный праздник пива в Мюнхене! На Октоберфест были приглашены крупнейшие партнеры компании Ab Inbev Efes в России, среди которых и сеть кальянных Мята Lounge.\n
Помимо наслаждения фестивалем, было проведено плодотворное обсуждение новых точек взаимодействия между поставщиком, крупными сетями и конечным потребителем\n
\n
Заходи в наш паблик ВК и читай подробности! [@myata.official](https://vk.com/myata.official)`,
  jTjr34O0u6BO7tQZVlMk: `Время летит так же быстро, как и проxодят туры Лиги Чемпионов!\n\n
Выбирайте ближайшее к вам заведение Мята Lounge, бронируйте столик и смотрите яркие матчи:\n
19:55 Реал Мадрид — Брюгге\n
22:00 Локомотив Москва — Атлетико Мадрид\n
22:00 Тоттенxэм — Бавария`,
  M9cjZJ8Xq9n60vSsiwRl: `Пока мы трудимся над тем, чтобы сделать наше приложение, сборная России по футболу проxодит квалификацию чемпионата Европы по футболу.\n
10 октября в 21:45 Россия – Шотландия\n
\n
Быстрее бронируем столик в  Мята Lounge и болеем за Россию!`,
};

const photoStyle = {
  height: 320,
  marginVertical: 12,
  width: '100%',
  borderRadius: 10,
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
          <Description
            markdownStyles={markdownStyles}
            renderListBullet={renderListBullet}
          >
            {tempDescriptions[item.id] && tempDescriptions[item.id].trim()}
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

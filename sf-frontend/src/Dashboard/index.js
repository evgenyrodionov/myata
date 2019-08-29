import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import snarkdown from 'snarkdown';
import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';

import Card from '../ui/Card';
import { getPhotoUrl } from '../utils/photos';

const PlacesSt = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: -36px;
  margin-right: -36px;
  margin-top: -16px;
  margin-bottom: -16px;
`;

const PlaceLink = styled(Link)`
  font-weight: 500;
  margin: 0;
  font-size: 14px;
  color: #192a3e;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 36px;
  padding-right: 36px;
  display: block;
`;

const PlaceItem = styled.li`
  border-bottom: 1px solid #ebeff2;

  &:hover {
    ${PlaceLink} {
      color: #2ed47a;
    }
  }
`;

function Places({ places = [] }) {
  return (
    <Card title="Мои заведения">
      <PlacesSt>
        {places.map(({ title, id }) => (
          <PlaceItem key={id}>
            <PlaceLink to={`/places/${id}`}>{title}</PlaceLink>
          </PlaceItem>
        ))}
      </PlacesSt>
    </Card>
  );
}

const NewsSt = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NewsCard = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  margin-bottom: 24px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); */
  transition: box-shadow 0.2s ease-in-out;

  /* &:hover {
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.14);
  } */
`;

const NewsItem = styled.li`
  &:first-child {
    ${NewsCard} {
      padding-top: 0;
    }
  }

  &:last-child {
    ${NewsCard} {
      padding-bottom: 0;
    }
  }
`;

const NewsDate = styled.p`
  color: #8e8e8e;
  font-size: 12px;
  margin-bottom: 4px;
`;

const NewsImage = styled.img`
  height: 256px;
  width: auto;
  object-fit: contain;
  border-radius: 10px;
  margin-top: 16px;
`;

const NewsTitle = styled(Link)`
  color: #323c47;
  letter-spacing: 0.01em;
  font-weight: 500;
  line-height: 22px;
  font-size: 15px;
  margin-bottom: 8px;
  margin-top: 0;
  display: block;
`;
const NewsDescription = styled.div``;

const generateHTML = md => ({ __html: snarkdown(md) });

const defaultDateFormat = eventAt =>
  format(eventAt, 'DD MMMM в HH:MM', { locale: ruLocale });

function News({ news = [], ...props }) {
  return (
    <Card title={props.title}>
      <NewsSt>
        {news.map(({
          title, description, coverId, eventAt,
        }) => (
          <NewsItem key={title}>
            <NewsCard>
              <NewsDate>{defaultDateFormat(eventAt.seconds * 1000)}</NewsDate>
              <NewsTitle to="/">{title}</NewsTitle>
              <NewsDescription
                dangerouslySetInnerHTML={generateHTML(description)}
              />
              {coverId && (
              <NewsImage src={`${getPhotoUrl(coverId)}/-/resize/x512/`} />
              )}
            </NewsCard>
          </NewsItem>
        ))}
      </NewsSt>
    </Card>
  );
}

export default function ({ places = [], news = [] }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12">
          <Card title="Статистика">
            <i>Запланировано на будущие релизы</i>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-7">
          <Card title="Новости УК">
            <i>Нужно получить контент</i>
          </Card>
          <News news={news} title="Федеральные новости" />
        </div>
        <div className="col-lg-5">
          <Places places={places} />
          <Card title="Последние события">
            <i>Запланировано на будущие релизы</i>
          </Card>
        </div>
      </div>
    </div>
  );
}

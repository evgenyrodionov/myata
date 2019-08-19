import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import snarkdown from 'snarkdown';
import Card from '../ui/Card';

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

const NewsItem = styled.li``;
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

const NewsTitle = styled(Link)`
  color: #323c47;
  letter-spacing: 0.01em;
  font-weight: 500;
  line-height: 22px;
  font-size: 15px;
  margin-bottom: 8px;
  display: block;
`;
const NewsDescription = styled.div``;

const generateHTML = md => ({ __html: snarkdown(md) });

function News({ news = [], ...props }) {
  return (
    <Card title={props.title}>
      <NewsSt>
        {news.map(({ title, description }) => (
          <NewsItem key={title}>
            <NewsCard>
              <NewsTitle to="/">{title}</NewsTitle>
              <NewsDescription
                dangerouslySetInnerHTML={generateHTML(description)}
              />
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
        <div className="col-xs-7">
          <Card title="Новости УК">
            <i>Нужно получить контент</i>
          </Card>
          <News news={news} title="Федеральные новости" />
        </div>
        <div className="col-xs-5">
          <Places places={places} />
          <Card title="Последние события">
            <i>Запланировано на будущие релизы</i>
          </Card>
        </div>
      </div>
    </div>
  );
}

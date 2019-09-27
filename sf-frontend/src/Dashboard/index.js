import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import snarkdown from 'snarkdown';
import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from 'recharts';

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
        {news.map(({ title, description, coverId, eventAt }) => (
          <NewsItem key={title}>
            <NewsCard>
              <NewsDate>{defaultDateFormat(eventAt.seconds * 1000)}</NewsDate>
              <NewsTitle to="/">{title}</NewsTitle>
              {description && (
                <NewsDescription
                  dangerouslySetInnerHTML={generateHTML(description)}
                />
              )}
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

const data = [
  {
    квартал: '1 квартал 2018',
    Выручка: 0,
    'Кол-во чеков': 0,
  },
  {
    квартал: '2 квартал 2018',
    Выручка: 2884903,
    'Кол-во чеков': 1727,
  },
  {
    квартал: '3 квартал 2018',
    Выручка: 6462742,
    'Кол-во чеков': 3532,
  },
  {
    квартал: '4 квартал 2018',
    Выручка: 9642859,
    'Кол-во чеков': 4761,
  },
  {
    квартал: '1 квартал 2019',
    Выручка: 10076836,
    'Кол-во чеков': 4801,
  },
  {
    квартал: '2 квартал 2019',
    Выручка: 9491922,
    'Кол-во чеков': 4577,
  },
  {
    квартал: '3 квартал 2019',
    Выручка: 5882076,
    'Кол-во чеков': 2826,
  },
];

function renderColorfulLegendText(value, entry) {
  const { color } = entry;

  return <span style={{ color }}>{value}</span>;
}

function formatNumber(value) {
  return new Intl.NumberFormat('ru').format(value);
}

function formatCurrency(value) {
  return `${formatNumber(value)}₽`;
}

function formatNumberAndCurrency(value, name) {
  if (name.includes('Выручка')) return formatCurrency(value);

  return formatNumber(value);
}

export default function({ places = [], news = [] }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12">
          <Card title="Статистика">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <ComposedChart
                  width={400}
                  height={300}
                  data={data}
                  margin={{
                    left: 20,
                    bottom: 0,
                    top: 10,
                  }}
                >
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="квартал" />
                  <YAxis
                    yAxisId="revenue"
                    tickFormatter={formatCurrency}
                    name="выручка"
                  />
                  <YAxis
                    yAxisId="invoices_amount"
                    tickFormatter={formatNumber}
                    orientation="right"
                  />

                  <Bar
                    yAxisId="invoices_amount"
                    dataKey="Кол-во чеков"
                    barSize={20}
                    fill="#5784BD"
                  />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="Выручка"
                    stroke="#A30D2F"
                  />
                  {/* <Line
                  type="monotone"
                   dataKey="edition" stroke="#111" /> */}
                  {/* <Bar dataKey="uv" barSize={20} fill="#413ea0" /> */}
                  <Legend formatter={renderColorfulLegendText} />
                  <Tooltip formatter={formatNumberAndCurrency} />
                  {/* <Tooltip content={<CustomTooltip />} /> */}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <Card title="Новости УК">Новостей пока нет 😔</Card>
          <News news={news} title="Федеральные новости" />
        </div>
        <div className="col-lg-6">
          <Places places={places} />
          <Card title="Последние события">
            <i>Запланировано на будущие релизы</i>
          </Card>
        </div>
      </div>
    </div>
  );
}

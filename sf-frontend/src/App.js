import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import StoreContext from 'storeon/react/context';
import orderBy from 'lodash/orderBy';

import Sidebar from './Sidebar';
// import Login from './Login';
import Dashboard from './Dashboard';
import Partners from './Partners';
import Users from './Users';
import PartnersCreate from './Partners/Create';
import PlaceDetails from './Places/Details';

import store from './store';
import fb from './firebase';
import { mapPlaces } from './Places/mappers';
import { mapUser } from './Users/mappers';

import media from './ui/media';

// eslint-disable-next-line import/prefer-default-export
function mapNews(docs) {
  const mappedDocs = [];

  docs.forEach(doc => mappedDocs.push({ id: doc.id, ...doc.data() }));

  return mappedDocs;
}

const Main = styled.main`
  display: flex;
  flex-direction: row;
`;

const View = styled.div`
  padding: 22px;
  width: 100%;

  ${media.greaterThan('sm')`
    margin-left: 256px;
    padding: 36px;
  `}
`;

function App() {
  const [places, setPlaces] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [user, setUser] = React.useState({});
  // const [, updateLoading] = React.useState(true);

  React.useEffect(() => {
    fb.firestore()
      .collection('users')
      .doc('79991112233')
      .onSnapshot(async doc => setUser(await mapUser(doc)));
  }, []);

  React.useEffect(() => {
    fb.firestore()
      .collection('places')
      .onSnapshot(docs => setPlaces(mapPlaces(docs)));
  }, []);

  React.useEffect(() => {
    fb.firestore()
      .collection('news')
      .onSnapshot(docs =>
        setNews(orderBy(mapNews(docs), 'eventAt.seconds', 'desc')));
  }, []);

  return (
    <Router>
      <>
        {/* <Redirect from="/" to="/login" /> */}

        <Main>
          <Sidebar user={user} />
          <View>
            <Route
              exact
              path="/"
              render={({ ...props }) => (
                <Dashboard places={places} news={news} {...props} />
              )}
            />
            <Route
              path="/places/:id"
              render={({ ...props }) => (
                <PlaceDetails
                  place={places.find(({ id }) => id === props.match.params.id)}
                  id={props.match.params.id}
                  {...props}
                />
              )}
            />
            <Route exact path="/partners" component={Partners} />
            <Route exact path="/partners/create" component={PartnersCreate} />
            <Route exact path="/users" component={Users} />
            {/* <Route path="/login" component={Login} /> */}
          </View>
        </Main>
      </>
    </Router>
  );
}

export default function () {
  return (
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  );
}

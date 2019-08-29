import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from './Sidebar';
// import Login from './Login';
import Dashboard from './Dashboard';
import PlaceDetails from './Places/Details';

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

  // listen to user updates
  React.useEffect(() => {
    fb.getDocOnSnapshot('users', '79991112233', async doc =>
      setUser(await mapUser(doc)));
  }, []);

  // listen to places updates
  React.useEffect(() => {
    fb.getCollectionOnSnapshot('places', docs => setPlaces(mapPlaces(docs)));
  }, []);

  // listen to places updates
  React.useEffect(() => {
    fb.getCollectionOnSnapshot('news', docs => setNews(mapNews(docs)));
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
            {/* <Route path="/login" component={Login} /> */}
          </View>
        </Main>
      </>
    </Router>
  );
}

export default App;

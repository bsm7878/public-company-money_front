import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import {Route, Switch} from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import RankPage from './pages/RankPage';
import { createBrowserHistory } from 'history';

const App = () => {
  // ReactGA.initialize("UA-203105090-1");
  // ReactGA.set({page: window.location.pathname});
  // ReactGA.pageview(window.location.pathname + window.location.search);

  // ReactGA.initialize("UA-203105090-1", { debug: true });
  // const history = createBrowserHistory();
  // history.listen((location) => {
  //   ReactGA.set({ page: location.pathname }); // Update the user's current page
  //   ReactGA.pageview(window.location.pathname + window.location.search); // Record a pageview for the given page
  // });


  return (
        <Switch>
          <Route exact path='/rank/:uniq_num' component={RankPage}/>
          <Route exact path='/' component={IndexPage}/>
        </Switch>

  );
};


export default App;
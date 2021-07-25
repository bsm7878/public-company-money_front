import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import {Route, Switch} from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import RankPage from './pages/RankPage';

const App = () => {
  ReactGA.initialize("UA-203105090-1");
  ReactGA.pageview(window.location.pathname + window.location.search);




  return (
        <Switch>
          <Route exact path='/rank/:uniq_num' component={RankPage}/>
          <Route exact path='/' component={IndexPage}/>
        </Switch>

  );
};


export default App;
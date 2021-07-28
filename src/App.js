import React  from 'react';
import {Route, Switch} from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import RankPage from './pages/RankPage';

const App = () => {



  return (
        <Switch>
          <Route exact path='/rank/:uniq_num' component={RankPage}/>
          <Route exact path='/' component={IndexPage}/>
        </Switch>

  );
};


export default App;
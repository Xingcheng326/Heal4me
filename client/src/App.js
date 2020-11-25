import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
// Redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.less';
import './styles/index.less'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    const white = ['/login', '/register', '/', '/profiles', '/posts']
    const pathname = window.location.pathname
    const shouldLoadUser = !white.includes(pathname)
    if (shouldLoadUser) {
      store.dispatch(loadUser());
    }
  }, []);
  
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route component={Routes}/>
        </Switch>
      </Router>
    </Provider>
  )
};
export default App;
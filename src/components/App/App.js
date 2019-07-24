import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Posts from '../../containers/Posts/Posts';
import AboutUs from '../AboutUs/AboutUs';
import Contacts from '../../containers/Contacts/Contacts';
import Register from '../../containers/Register/Register';
import Login from '../../containers/Login/Login';
import Logout from '../../containers/Logout/Logout';
import NotFound from '../NotFound/NotFound';
import './App.scss';

const app = () => {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Toolbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default app;

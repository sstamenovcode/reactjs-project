import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import firebase from 'firebase';
import Toolbar from '../Toolbar/Toolbar';
import Footer from '../../components/Footer/Footer';
import Home from '../../components/Home/Home';
import AdminDashboard from '../../containers/Admin/AdminDashboard/AdminDashboard';
import UserProfile from '../UserProfile/UserProfile';
import Clubs from '../../containers/Clubs/Clubs';
import Club from '../../containers/Club/Club';
import AdminEditDeleteClub from '../../containers/Admin/AdminEditDeleteClub/AdminEditDeleteClub';
import AboutUs from '../../components/AboutUs/AboutUs';
import Contacts from '../Contacts/Contacts';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import NotFound from '../../components/NotFound/NotFound';

import './App.scss';

export class App extends Component {
  state = {
    isAuth: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuth: true
        });
      } else {
        this.setState({
          isAuth: false
        });
      }
    });
  }

  render() {
    let routes = null;

    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/posts/:id" component={AdminEditDeleteClub} />
          <Route path="/clubs" exact component={Clubs} />
          <Route path="/clubs/:id" component={Club} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/logout" component={Logout} />
          <Route path="*" component={NotFound} />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/clubs" exact component={Clubs} />
          <Route path="/clubs/:id" component={Club} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      )
    }

    return (
      <Router>
        <div className="App">
          <div className="content">
            <Toolbar isAuth={this.state.isAuth} />
            {routes}
          </div>
          <Footer />
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick 
          />
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import firebase from 'firebase';
import Toolbar from '../Toolbar/Toolbar';
import Home from '../../containers/Home/Home';
import UserProfile from '../UserProfile/UserProfile';
import AdminDashboard from '../../containers/Admin/AdminDashboard/AdminDashboard';
import AdminEditDeleteClub from '../../containers/Admin/AdminEditDeleteClub/AdminEditDeleteClub';
import Clubs from '../../containers/Clubs/Clubs';
import Club from '../../containers/Club/Club';
import AboutUs from '../../components/AboutUs/AboutUs';
import Contacts from '../Contacts/Contacts';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import NotFound from '../../components/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';

import './App.scss';

export class App extends Component {
  state = {
    isAuth: null,
    isAdmin: null
  };

  componentDidMount() {
    this.setState({
      isAuth: localStorage.getItem('loggedIn')
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isAuth: true
        });

        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then(idTokenResult => {
            // Confirm the user is an Admin.
            if (!!idTokenResult.claims.admin) {
              // Show admin UI.
              this.setState({
                isAdmin: true
              });
            } else {
              // Show regular user UI.
              this.setState({
                isAdmin: false
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.setState({
          isAuth: false,
          isAdmin: false
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
      );
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
      );
    }

    return (
      <Router>
        <div className="App">
          <div className="content">
            <Toolbar isAuth={this.state.isAuth} isAdmin={this.state.isAdmin} />
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

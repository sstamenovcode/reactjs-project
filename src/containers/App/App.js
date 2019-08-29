import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
// import { Beforeunload } from 'react-beforeunload';
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
import { getUserData, logoutUser } from '../../actions/authActions';
import { isUserAuth } from '../../utility';

import './App.scss';

export class App extends Component {
  componentDidMount() {
    this.props.getUserDataAction();
  }

  render() {
    let routes = null;

    if (isUserAuth()) {
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
          {/* <Beforeunload onBeforeunload={() => this.props.onLogout()} /> */}
          <div className="content">
            <Toolbar isAuth={this.props.isAuth} />
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

const mapStateToProps = state => ({
  isAuth: state.auth.email
})

const mapDispatchToProps = dispatch => {
  return {
    getUserDataAction: () => dispatch(getUserData()),
    // onLogout: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import Toolbar from '../../containers/Toolbar/Toolbar';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Posts from '../../containers/Posts/Posts';
import AboutUs from '../AboutUs/AboutUs';
import Contacts from '../../containers/Contacts/Contacts';
import Register from '../../containers/Register/Register';
import Login from '../../containers/Login/Login';
import Logout from '../../containers/Logout/Logout';
import NotFound from '../NotFound/NotFound';
import { getUserData } from '../../actions/authActions';
import { isUserAuth } from '../../utility';

import './App.scss';

class App extends Component {
  componentDidMount() {
    return isUserAuth() ? this.props.getUserDataAction() : null;
  }

  render() {
    let routes = null;

    if (isUserAuth()) {
      routes = (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={Posts} />
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
          <Route path="/posts" exact component={Posts} />
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
            <Toolbar isAuth={this.props.isAuthenticated} />
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
  isAuthenticated: state.auth.email !== null
})

const mapDispatchToProps = dispatch => {
  return {
    getUserDataAction: () => dispatch(getUserData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

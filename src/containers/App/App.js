import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Toolbar from './../../components/Toolbar/Toolbar'
import Footer from './../../components/Footer/Footer'
import Home from '../../components/Home/Home'
import Posts from './../../components/Posts/Posts'
import AboutUs from './../../components/AboutUs/AboutUs'
import Contacts from './../../components/Contacts/Contacts'
import NotFound from './../../components/NotFound/NotFound'
import './App.scss'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Toolbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/posts" component={Posts} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/contacts" component={Contacts} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App

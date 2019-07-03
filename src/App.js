import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './components/Home'
import Posts from './components/Posts'
import AboutUs from './components/AboutUs'
import Contacts from './components/Contacts'
import NotFound from './components/NotFound'
import './App.scss'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Nav />
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

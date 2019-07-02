import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './components/Home'
import Posts from './components/Posts'
import AboutUs from './components/AboutUs'
import Contacts from './components/Contacts'
import './App.scss'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Nav />
          <Route path="/" exact component={Home} />
          <Route path="/posts" component={Posts} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contacts" component={Contacts} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App

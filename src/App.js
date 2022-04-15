import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          {/* <News pageSize={6} country="in" category="general"/> */}
          <Routes>
            <Route exact path="/" element={<News key="home" api={this.apikey} pageSize={6} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News key="business" api={this.apikey} pageSize={6} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News key="entertainment" api={this.apikey} pageSize={6} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<News key="health" api={this.apikey} pageSize={6} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News key="science" api={this.apikey} pageSize={6} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News key="sports" api={this.apikey} pageSize={6} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News key="technology" api={this.apikey} pageSize={6} country="in" category="technology"/>}/>
            <Route exact path="/general" element={<News key="general" api={this.apikey} pageSize={6} country="in" category="general"/>}/>
          </Routes>
        </div>
      </Router>
      
    )
  }
}

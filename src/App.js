import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

const App = ()=> {
  const apikey = process.env.REACT_APP_NEWS_API;
    return (
      <Router>
        <div>
          <Navbar />
          {/* <News pageSize={6} country="in" category="general"/> */}
          <Routes>
            <Route exact path="/" element={<News key="home" api={apikey} pageSize={6} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News key="business" api={apikey} pageSize={6} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News key="entertainment" api={apikey} pageSize={6} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<News key="health" api={apikey} pageSize={6} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News key="science" api={apikey} pageSize={6} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News key="sports" api={apikey} pageSize={6} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News key="technology" api={apikey} pageSize={6} country="in" category="technology"/>}/>
            <Route exact path="/general" element={<News key="general" api={apikey} pageSize={6} country="in" category="general"/>}/>
          </Routes>
        </div>
      </Router>
      
    )
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './container/home.js'

class App extends Component {
  render() {
    return (
     <Router>
       <div>
         <ul>
           <li><Link to='/'>Voting</Link></li>
           <li><Link to='/'>Home</Link></li>
           <li><Link to='/My Polls'>My Polls</Link></li>
           <li><Link to='/New Polls'>New Polls</Link></li>
         </ul>
         <hr />
         <Route exact path='/' component={Home} />
       </div>
     </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import firebase from 'firebase'
import './App.css';
import Home from './container/home.js'

var config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID
  };
firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider()

class App extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: '',
      signIn: false
    }
    this.handleSignIn = this.handleSignIn.bind(this)
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var providerData = user.providerData;
        // console.log(user)
        this.setState({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          signIn: true
        })
        firebase.database().ref('users/' + user.uid).set({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL
        }).catch(function(error){
          console.error("寫入使用者資訊錯誤",error);
        })
        console.log(user.uid, user.displayName, user.email);
      } else {
        console.log('signed out')
      }
    })
  }
  handleSignIn() {
    if (this.state.signIn) {
      firebase.auth().signOut()
      this.setState({signIn: false})
      return
    }
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
      })
      .catch(function(error) {
        if (error) console.log(error)
      });
  }
  render() {
    let signIn = this.state.signIn
    return (
     <Router>
       <div className="container">
         <nav>
           <span className="nav-header"><Link to='/'>Voting</Link></span>
           <ul>
             <li><Link to='/'>Home</Link></li>
             {signIn ? <li><Link to='/My Polls'>My Polls</Link></li> : ''}
             {signIn ? <li><Link to='/New Polls'>New Polls</Link></li> : ''}
             {signIn ? <li>{this.state.email}</li> : ''}
             <li>
               <button onClick={this.handleSignIn}>{signIn ? 'Sign Out':'Sign In With Google'}</button>
             </li>
           </ul>
         </nav>
           <hr />
           <Route exact path='/' component={Home} />
       </div>
     </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from 'firebase';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AccountCircle from 'material-ui-icons/AccountCircle';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import { blue } from 'material-ui/colors';
import fire from './firebase';
import Home from './container/home';
import MyPolls from './container/mypolls';
import NewPolls from './container/newpolls';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
    color: 'white',
    textDecoration: 'none',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    margin: '0 5px 0 5px',
    height: 22,
    width: 22,
  },
  bar: {
    backgroundColor: blue[700],
  },
  logout: {
    backgroundColor: blue[500],
  },
});


class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  constructor() {
    super();
    this.state = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      signIn: false,
      anchorEl: null,
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }
  componentWillMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          signIn: true,
        });
        fire.database().ref(`users/${user.uid}`).set({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        });
      }
    });
  }
  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleRequestClose() {
    this.setState({ anchorEl: null });
  }
  handleSignIn() {
    if (this.state.signIn) {
      firebase.auth().signOut();
      this.setState({ signIn: false });
      return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(() => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    });
  }
  render() {
    const { signIn, anchorEl } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);
    return (
      <Router>
        <div>
          <AppBar className={classes.bar} position="static">
            <Toolbar>
              <Typography component={Link} className={classes.flex} type="title" to="/">
                Voting
              </Typography>
              <Button component={Link} color="contrast" to="/">Home</Button>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="contrast"
              >
                {signIn ?
                  <Avatar alt="Remy Sharp" src={this.state.photoURL} className={classes.avatar} /> :
                  <AccountCircle />}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onRequestClose={this.handleRequestClose}
              >
                {signIn ? <MenuItem component={Link} color="contrast" onClick={this.handleRequestClose} to="/NewPolls">New Polls</MenuItem> : ''}
                {signIn ?
                  <MenuItem component={Link} color="contrast" onClick={this.handleRequestClose} to={`/MyPolls/${this.state.displayName}`}>
                    My Polls
                  </MenuItem> : ''}
                <MenuItem onClick={() => {
                    this.handleRequestClose();
                    this.handleSignIn();
                  }}
                >
                  {signIn ? 'Sign Out' : 'Sign In'}
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/MyPolls/:displayName" render={() => <MyPolls uid={this.state.uid} />} />
          <Route exact path="/NewPolls" render={() => <NewPolls uid={this.state.uid} />} />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);

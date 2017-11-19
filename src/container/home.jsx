import React, { Component } from 'react';
import ReactList from 'react-list';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import firebase from '../firebase';
import PollCard from '../components/PollCard';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 22,
    textAlign: 'center',
  },
  inline: {
    display: 'inline-block',
    margin: '8px 8px',
    textAlign: 'left',
  },
};

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.renderItem = this.renderItem.bind(this);
  }
  componentWillMount() {
    firebase.database().ref('/polls/').once('value').then((snapshot) => {
      const raw = snapshot.toJSON();
      const pollList = Object.keys(raw).map(a => ({ id: a, ...raw[a] }));
      this.setState({ data: pollList });
    });
  }
  renderItem(index, key, classes) {
    return (
      <div key={key} className={classes.inline}>
        <PollCard data={this.state.data[index]} />
      </div>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ReactList
          itemRenderer={(index, key) => this.renderItem(index, key, classes)}
          length={this.state.data.length}
          type="simple"
        />
      </div>
    );
  }
}

export default withStyles(styles)(Home);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from '../firebase';

class MyPolls extends Component {
  static propTypes = {
    uid: PropTypes.string,
  };
  static defaultProps ={
    uid: '',
  };
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    const ref = firebase.database().ref('polls/');
    ref.orderByChild('creatorUid').equalTo(this.props.uid)
      .on('child_added', (snapshot) => {
        this.setState({ data: [{ id: snapshot.key, ...snapshot.toJSON() }, ...this.state.data] });
      });
  }

  render() {
    // console.log(this.state.data);
    return (
      <div>
        mypolls
        {this.state.data.map(data => <div key={data.id}>{data.title}</div>)}
      </div>
    );
  }
}

export default MyPolls;

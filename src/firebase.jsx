import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: '',
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
};
const fire = firebase.initializeApp(config);

export default fire;

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCZGSKUc3rMKxfbqX8pbzeN_iNCIrk4C-w",
    authDomain: "mynodejsbase.firebaseapp.com",
    databaseURL: "https://mynodejsbase.firebaseio.com",
    projectId: "mynodejsbase",
    storageBucket: "mynodejsbase.appspot.com",
  };

firebase.initializeApp(firebaseConfig)

ReactDOM.render(<App />, document.getElementById('root'))
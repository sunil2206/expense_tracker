importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: 'AIzaSyCfPxkMHRLMmsaGMvLdRSBx7t9kpwzlNW0',
  authDomain: 'fir-prac-db79c.firebaseapp.com',
  databaseURL: 'https://fir-prac-db79c.firebaseio.com',
  projectId: 'fir-prac-db79c',
  storageBucket: 'fir-prac-db79c.appspot.com',
  messagingSenderId: '550135170836',
  appId: '1:550135170836:web:1166efd1d619a7cdf3a401',
  measurementId: 'G-F9E4N3FVPB'
});

const messaging = firebase.messaging();

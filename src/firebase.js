import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAeqv3zxxdTJPnKb3q7Cu4ER-wbC1-1Tcw",
    authDomain: "netflix-react-6d889.firebaseapp.com",
    projectId: "netflix-react-6d889",
    storageBucket: "netflix-react-6d889.appspot.com",
    messagingSenderId: "615375116287",
    appId: "1:615375116287:web:6e03ec9d7efa2f69be39ca"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {auth};
  export default db;
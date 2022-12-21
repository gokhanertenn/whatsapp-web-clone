import firebase from "firebase"




const firebaseConfig = {
    apiKey: "AIzaSyCrAHVRFgWB9ceHTeTBjao5p_ghCQ2zhaM",
    authDomain: "whatsapp-clone-ab505.firebaseapp.com",
    projectId: "whatsapp-clone-ab505",
    storageBucket: "whatsapp-clone-ab505.appspot.com",
    messagingSenderId: "715406778403",
    appId: "1:715406778403:web:8530b890ccb1093dfc9196",
    measurementId: "G-9VNY0DEG41"
  };


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth,googleProvider};

export default db;
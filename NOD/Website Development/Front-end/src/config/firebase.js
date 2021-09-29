import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

// copy var firebaseConfig object AND firebase.initializeApp(firebaseConfig) line from firebase project console to he
var firebaseConfig = {
    apiKey: "AIzaSyBRaynptvyI1xCpiw8L1RYZB6XfwYsVJdQ",
    authDomain: "netcompany-108f5.firebaseapp.com",
    projectId: "netcompany-108f5",
    storageBucket: "netcompany-108f5.appspot.com",
    messagingSenderId: "253252298678",
    appId: "1:253252298678:web:aa710768df07963e0f0317",
    measurementId: "G-MX7CJQ5FPY"
};

export default firebase.initializeApp(firebaseConfig);

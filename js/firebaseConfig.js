import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJH9BBwnAfBckHGipfLT4LWN__ZTsjmiQ",
    authDomain: "teste-login-62907.firebaseapp.com",
    projectId: "teste-login-62907",
    storageBucket: "teste-login-62907.firebasestorage.app",
    messagingSenderId: "597278503776",
    appId: "1:597278503776:web:77df138b910aa51a1fe405"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import { firebaseConfig} from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // app is your Firebase app instance

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.replace("index.html");
  }
});
// Submit button event
const form = document.querySelector("form");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userdata = {
                email: email,
                password: password
            };
            alert("Account created successfully!");
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userdata)
                .then(() => {
                    window.location.href = "login.html";
                    //console.log("Document written with ID: ", user.uid);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

});

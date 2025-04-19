// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Redirect to index.html if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.replace("index.html");
  }
});

// Handle form submit for login
const form = document.querySelector("form");
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid); // Store UID in localStorage
      alert("Logged In successfully!");
      window.location.href = "index.html"; 
    })
    .catch((error) => {
      alert(error.message); // Show error to user
    });
});

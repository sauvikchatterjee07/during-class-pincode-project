import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { firebaseConfig} from './firebase-config.js';
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const db = getFirestore(app); // Initialize Firestore
window.addEventListener('pageshow', function (event) {
  if (event.persisted || (performance.getEntriesByType("navigation")[0]?.type === "back_forward")) {
    window.location.reload();
  }
});



onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    const docRef = doc(db, "users", userId);

    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("user").innerHTML = `Welcome ${userData.email}`;
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  } else {
    // Redirect if not logged in
    window.location.replace("login.html");
  }
});

const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("User signed out successfully.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
});


const style = document.createElement("style"); //<style></style>
const container2 = document.querySelector('.container2');

style.textContent = `
@keyframes animateBg {
  100% {
    filter: hue-rotate(360deg);
  }
}

body {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #fff;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 1;
   font-family: 'Poppins', sans-serif;
}

body::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('./assets/Index.png') no-repeat center center / cover;
  z-index: -1;
  animation: animateBg 5s linear infinite;
  filter: hue-rotate(0deg);
}

a{
    text-decoration: none;
    color: #fff;
    text-decoration: underline;
}
#footer{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.container1 {
  position: relative;
  width: 500px;
  height: 100px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
}

.container2 {
  position: relative;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
}

.container2::-webkit-scrollbar {
  width: 8px;
}
.container2::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

#pincode {
  width: 300px;
  height: 30px;
  margin-right: 10px;
  border: 5px solid #fff;
}

button {
 width: 100px;
    height: 40px;
    background: #80669d;
    border: none;
    outline: none;
    border-radius: 40px;
    font-size: 1em;
    color: white;
    cursor: pointer;

    font-weight: 500;
}

#result {
  color: #fff;
  line-height: 1.6;
}
`;


document.head.appendChild(style);
const Search = document.getElementById("Search");
Search.addEventListener("click", getPincodeData);
function getPincodeData() {
    //take the pincode value in a variable
    const pin = document.getElementById("pincode").value;

    // console.log(pin);

    const resultDiv = document.getElementById("result");

    //check if pincode is valid
    if (pin.length !== 6 || isNaN(pin)) {
        resultDiv.innerHTML = "Please enter a valid 6-digit PIN code";
        return;
    }

    //network call to the api
    const API = `https://api.postalpincode.in/pincode/${pin}`;

    // console.log(API);

    fetch(API)
        .then((resp) => resp.json())
        .then((data) => {
            const info = data[0];

            // console.log(info);

            if (info.Status === "Success") {
                const postOffice = info.PostOffice;
                // console.log(postOffice);

                let output = `<h3>RESULTS FOR PIN ${pin} : </h3> <hr/>`;

                postOffice.forEach((office) => {
                    output += `
                    <p> Post Office: ${office.Name}</p>
                    <p> District: ${office.District}</p>
                    <p> State: ${office.State}</p>
                    <hr/>
                    `;
                });

                resultDiv.innerHTML = output;
                container2.style.display = "flex";
            } else {
                resultDiv.innerHTML = info.Message;
                container2.style.display = "flex";
            }
        })
        .catch((error) => {
            resultDiv.innerHTML =
                "Error in the data for this PIN Code. Try again later.";
            console.log(error);
        });

    // console.log(prom);

    
}

const style = document.createElement("style"); //<style></style>
const container2 = document.querySelector('.container2');

style.textContent = `
@keyframes animateBg {
  100% {
    filter: hue-rotate(360deg);
  }
}

body {
  margin: 0;
  padding: 0;
  color: #fff;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  font-family: sans-serif;
}

body::before {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('./assets/Index.png') no-repeat center center / cover;
  z-index: -1;
  animation: animateBg 5s linear infinite;
  filter: hue-rotate(0deg);
}

#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
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
  margin: 0 auto 30px;
}

#pincode {
  padding: 5px 10px;
  width: 250px;
  height: 30px;
  margin-right: 10px;
  border: 5px solid #fff;
  border-radius: 8px;
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
  transition: all 0.3s ease;
}

button:hover {
  background-color:rgba(144, 0, 163, 0.64);
}

.heading {
  margin-top: 30px;
  font-size: 24px;
}

.loc {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
  text-align: left;
  color: white;
}

.loc p {
  margin: 6px 0;
  font-size: 16px;
}

.error {
  color: #d8000c;
  background-color: #ffd2d2;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 20px;
}

.loader {
  margin: 30px auto;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #0077cc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

#result {
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
}
`;


document.head.appendChild(style);

function getPincodeData() {
    //take the pincode value in a variable
    const pin = document.getElementById("pincode").value;

    // console.log(pin);

    const resultDiv = document.getElementById("result");

    //check if pincode is valid
    if (pin.length !== 6 || isNaN(pin)) {
      resultDiv.innerHTML = `<p class="error">❌ Please enter a valid 6-digit PIN code.</p>`;
      return;
    }

    //network call to the api
    const API = `https://api.postalpincode.in/pincode/${pin}`;

    // console.log(API);

    // Showing loading state
    resultDiv.innerHTML = `<div class="loader"></div>`;

    fetch(API)
    .then((resp) => resp.json())
    .then((data) => {
      const info = data[0];

      if (info.Status === "Success") {
        const postOffices = info.PostOffice;
        let output = `<h2 class="heading">📍 Results for PIN ${pin}</h2>`;

        postOffices.forEach((office) => {
          output += `
              <div class="loc">
                <p><strong>Post Office:</strong> ${office.Name}</p>
                <p><strong>District:</strong> ${office.District}</p>
                <p><strong>State:</strong> ${office.State}</p>
              </div>
              `;
        });

        resultDiv.innerHTML = output;
      } else {
          resultDiv.innerHTML = `<p class="error">⚠️ ${info.Message}</p>`;
      }
    })
    .catch((error) => {
            resultDiv.innerHTML = `<p class="error">❌ Could not fetch data. Please try again later.</p>`;
    });

    // console.log(prom);

    
}

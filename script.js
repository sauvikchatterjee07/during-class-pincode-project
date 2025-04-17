function getPincodeData() {
    const pin = document.getElementById('pincode').value;
    const resultDiv = document.getElementById("result");

    // Validation
    if (pin.length !== 6 || isNaN(pin)) {
        resultDiv.innerHTML = `<p class="error">❌ Please enter a valid 6-digit PIN code.</p>`;
        return;
    }

    const API = `https://api.postalpincode.in/pincode/${pin}`;

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
                        <div class="card">
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
}

// Styling
const style = document.createElement("style");
style.textContent = `
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(to right, #e0eafc, #cfdef3);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 20px;
        margin: 0;
        cursor: default;
    }

    input {
        padding: 12px;
        width: 250px;
        font-size: 16px;
        border: 2px solid #0077cc;
        border-radius: 8px;
        margin-right: 10px;
        transition: all 0.3s ease;
    }

    input:focus {
        outline: none;
        border-color: #005fa3;
        box-shadow: 0 0 8px rgba(0, 119, 204, 0.3);
    }

    button {
        padding: 12px 20px;
        font-size: 16px;
        background-color:rgb(76, 198, 251);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    button:hover {
        background-color:rgb(0, 92, 163);
    }

    .heading {
        margin-top: 30px;
        font-size: 24px;
    }

    .card {
        background-color: #ffffff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        padding: 20px;
        margin: 20px auto;
        max-width: 400px;
        text-align: left;
    }

    .card p {
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

    .input-group {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }

    .input-group input {
        flex: 1 1 250px;
        max-width: 300px;
    }

    .input-group button {
        flex-shrink: 0;
    }
`;

document.head.appendChild(style);
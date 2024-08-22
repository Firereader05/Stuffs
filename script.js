// Configuration for jsonbin.io
const apiKey = '$2a$10$st.acJGoKc4lbSYAhnaIoOnc3gFoQGbxuv2hIGRkde2bvDaXybFuC';  // Replace with your actual API key
const binId = '66c73f65e41b4d34e423bd43';  // Replace with your actual Bin ID
const binUrl = `https://api.jsonbin.io/v3/b/${binId}`; // Updated URL structure for PUT

// Get the HTML elements
const sendDataButton = document.getElementById('sendData');
const fetchDataButton = document.getElementById('fetchData');
const output = document.getElementById('output');

// Function to send data to the bin
function sendData() {
    const data = { message: "Hello, JSONBin!" };

    fetch(binUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(text => {
        try {
            const json = JSON.parse(text);
            console.log('Data sent:', json);
            output.textContent = "Data sent successfully!";
        } catch (e) {
            console.error('Error parsing JSON:', e);
            output.textContent = `Error sending data: ${text}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        output.textContent = `Error sending data: ${error.message}`;
    });
}

// Function to fetch data from the bin
function fetchData() {
    fetch(`${binUrl}/latest`, { // URL for fetching the latest version
        method: 'GET',
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => response.text())
    .then(text => {
        try {
            const json = JSON.parse(text);
            console.log('Data fetched:', json.record);
            output.textContent = `Fetched Data: ${JSON.stringify(json.record)}`;
        } catch (e) {
            console.error('Error parsing JSON:', e);
            output.textContent = `Error fetching data: ${text}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        output.textContent = `Error fetching data: ${error.message}`;
    });
}

// Event listeners for the buttons
sendDataButton.addEventListener('click', sendData);
fetchDataButton.addEventListener('click', fetchData);

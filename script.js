// Configuration for jsonbin.io
const apiKey = '$2a$10$Uc0QY0btzASJ59ENNfoEsOFkgGVydhD5syUMRadzecBpGjC9DEQW2';  // Replace with your actual API key
const binId = '66c73f65e41b4d34e423bd43';  // Replace with your actual Bin ID
const binUrl = `https://api.jsonbin.io/v3/b/${binId}/latest`;

// Get the HTML elements
const sendDataButton = document.getElementById('sendData');
const fetchDataButton = document.getElementById('fetchData');
const output = document.getElementById('output');

// Function to send data to the bin
function sendData() {
    // Simple data to send
    const data = { message: "Hello, JSONBin!" };

    fetch(binUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': apiKey
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Handle non-OK responses
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json();
    })
    .then(data => {
        console.log('Data sent:', data);
        output.textContent = "Data sent successfully!";
    })
    .catch(error => {
        console.error('Error:', error);
        output.textContent = `Error sending data: ${error.message}`;
    });
}

// Function to fetch data from the bin
function fetchData() {
    fetch(binUrl, {
        method: 'GET',
        headers: {
            'X-Master-Key': apiKey
        }
    })
    .then(response => {
        // Handle non-OK responses
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json();
    })
    .then(data => {
        console.log('Data fetched:', data.record);
        output.textContent = `Fetched Data: ${JSON.stringify(data.record)}`;
    })
    .catch(error => {
        console.error('Error:', error);
        output.textContent = `Error fetching data: ${error.message}`;
    });
}

// Event listeners for the buttons
sendDataButton.addEventListener('click', sendData);
fetchDataButton.addEventListener('click', fetchData);

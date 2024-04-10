function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        if (data.success) {
            fetchEquipment();
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('There was an error with the fetch operation:', error);
    });
}

function fetchEquipment() {
    // Implement logic to fetch equipment data from the server
}

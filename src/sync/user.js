export const login = () => {
    fetch('http://localhost:8000/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": "123","password": "456"})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

}
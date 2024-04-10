const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
    const uri = 'mongodb://localhost:27017/';
    const options = {
        useUnifiedTopology: true,
    };

    try {
        const client = new MongoClient(uri, options);
        await client.connect();
        console.log('Connected to MongoDB');
        // Далее можно выполнять операции с базой данных с использованием объекта client
        // Например: const db = client.db('mydatabase');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

connectToMongoDB();

document.addEventListener("DOMContentLoaded", function() {
    const userpos = document.getElementById('user-post');

    function loading() {
        fetch("http://localhost:3000/basapost")
            .then(response => response.json())
            .then(users => { 
                users.forEach(user => {
                    const postElement = document.createElement('div');
                    postElement.innerHTML = `
                        <h1>
                            ID: ${user.id}<br>
                            Email: ${user.email}<br>
                            Phone: ${user.phone}<br>
                            User: ${user.name}
                        </h1>
                    `; 
                    userpos.appendChild(postElement);
                });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    loading();
});

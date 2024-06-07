import React, {useState} from 'react';
import SharedCard from '../sharedComponents/SharedCard';
// import SocialMediaShare from '../sharedComponents/SocialMediaShare';

async function fetchAndStoreApiKey() {
    try {
        const response = await fetch('http://localhost:8000/api/users/api_key', {
            method: 'POST', // Specify the method as POST
            credentials: 'include', // Include cookies with the request
            headers: {
                'Content-Type': 'application/json' // Assuming the server expects JSON
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const apiKey = data.api_key; // Ensure the key in the response matches this name
        await browser.storage.sync.set({ apiKey: apiKey });
        console.log('API Key stored successfully!');
    } catch (error) {
        console.error('Error fetching or storing API key:', error);
    }
}

const AboutTab = () => {
    const handleFetchApiKey = async () => {
        await fetchAndStoreApiKey();
        alert('API Key fetched and stored successfully!');
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            console.log('Login successful:', data);
            alert('Logged in successfully!');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed. Check console for details.');
        }
    }

    return (
        <div>
            <SharedCard>
                <h4>About The Extension</h4>
                <p>Stay focused is an open source chrome extension to help you to block distraction websites like social media.</p>
                <p>The idea behind this is that sometimes you are working, and suddenly you find yourself sitting on social media like Facebook, and you spend there like 30 minutes without noticing that. So this chrome extension will show an image to remind you to back to work.</p>
            </SharedCard>
            <SharedCard>
                <h4>Credits</h4>
                <p>Maher Khdeir</p>
                <a target="_blank" href="https://www.linkedin.com/in/maher-khdeir/">LinkedIn</a>
            </SharedCard>
            <SharedCard>
                <h4>Want to contribute?</h4>
                Check the open source <a target="_blank" href="https://github.com/MaherSaleem/stay-focused-chrome-extension">Github Repository</a>.
            </SharedCard>
            <SharedCard>
                <div>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </SharedCard>
            <SharedCard>
                <button onClick={handleFetchApiKey}>Fetch API Key</button>
            </SharedCard>
        </div>
    );
}

export default AboutTab;
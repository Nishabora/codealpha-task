// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);

  const API_URL = 'http://localhost:5000/api';

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      console.log(response.data);
      setLoggedIn(true);
      fetchPosts();
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error.message);
    }
  };

  return (
    <div>
      {!loggedIn ? (
        <div>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Social Media Dashboard</h1>
          {posts.map((post, index) => (
            <div key={index}>
              <p>{post.platform}: {post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

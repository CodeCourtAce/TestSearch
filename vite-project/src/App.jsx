import React, { useState, useEffect } from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(error => setError(error));
  }, []);

  const setData = ({ 
     name,
     login, 
     followers, 
     following, 
     public_repos, 
     avatar_url 
  }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(error => setError(error));
  };

  return (
    <div>
      <div className="navbar">GitHub Search</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input 
              placeholder="GitHub user" 
              name="github user" 
              onChange={handleSearch} 
            />
            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      <div className="card">
        <Image src={avatar || 'https://via.placeholder.com/100'} alt="Avatar" />
        <div className="content">
          <div className="header">{name || 'Example Name'}</div>
          <div className="meta">{userName || 'example'}</div>
          <div className="extra">
            <p><Icon name="user" /> {followers} Followers</p>
            <p><Icon name="book" /> {repos} Repos</p>
            <p><Icon name="user" /> {following} Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

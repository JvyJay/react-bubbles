import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/login`, { username, password })
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push(`/bubble-page`);
      });
  };
  return (
    <>
      <form onSubmit={submit}>
        <input
          placeholder='Username'
          name='username'
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder='Password'
          name='Password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Sign in</button>
        <button
          onClick={() => {
            localStorage.removeItem('token');
          }}
        >
          Log Out
        </button>
      </form>
    </>
  );
};

export default Login;

import React, { useState } from 'react';
import styles from "./LoginForm.css";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/api/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      setEmail('')
      setPassword('')
      navigate('/login')
    } else {
      let data = await response.json()
      window.localStorage.setItem("token", data.token,)
      window.localStorage.setItem("userID", data.userID,)
      window.localStorage.setItem("userFriends", data.userFriends.join(','))


      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <section className="login">
        <form onSubmit={handleSubmit}>
          <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input role='submit-button' id='submit' type="submit" value="Submit" />
        </form>
      </section>
    );
}

export default LogInForm;

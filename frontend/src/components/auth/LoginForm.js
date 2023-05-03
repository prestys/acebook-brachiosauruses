import React, { useState } from 'react';
import styles from "./LoginForm.css";
import SubmitButton from '../submitButton/SubmitButton';

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
      console.log(data);
      window.localStorage.setItem("token", data.token,)
      window.localStorage.setItem("userID", data.userID,)
      window.localStorage.setItem("username", data.username,)
      window.localStorage.setItem("userImgURL", data.userImgURL,)
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
        <form  id="login-form" className="login-form" onSubmit={handleSubmit}>
          <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
        </form>
        <SubmitButton form='login-form' id='login-form-button' text='Log In' />
      </section>
    );
}

export default LogInForm;

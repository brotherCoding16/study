import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const validPasswords = ['mahdir10', 'afiqrcs15', 'asdf', 'esha10'];
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handlePasswordSubmit = () => {
    const isValidPassword = validPasswords.includes(password);

    if (isValidPassword) {
      // Redirect to the new page
      localStorage.setItem('loggedInPassword', password);
      props.setPassword(password);
      navigate(`/contents/${password}`);
      // Show alert when login is successful
      setAlertMessage('Login successful!');
      setShowAlert(true);
    } else {
      setAlertMessage('Invalid password. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <div className='home'>
      <br></br><br></br>
      <div className='wrapper'>
        <center>
          <h2 className='typing-demo'>Welcome to the Home Page!</h2>
        </center>
      </div>
      <br></br>
      <br></br><br></br><br></br><br></br>
      <center>
        <div className='login'>
          <br></br>
          <p className='epal'>Enter Your Password</p>
          <input
            className='input-box'
            type="password"
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handlePasswordSubmit();
              }
            }}
          />
          <br></br>
          <button className='btn' onClick={handlePasswordSubmit}>Submit</button>
        </div>
      </center>
      {showAlert && (
        <div className='custom-alert'>
          <center>
          <p>{alertMessage}</p>
          <button onClick={() => setShowAlert(false)}>Close</button>
          </center>
          
        </div>
      )}
    </div>
  );
};

export default Home;

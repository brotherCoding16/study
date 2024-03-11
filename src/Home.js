import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const validPasswords = ['mahdir10', 'afiqrcs15',"asdf"];

  // useEffect(() => {
  //   const storedPassword = localStorage.getItem('loggedInPassword');
  //   if (storedPassword !== null) {
  //     props.setPassword(storedPassword);
  //     navigate(`/new-page/${storedPassword}`);
  //   }
  // }, [props, navigate]);

  const handlePasswordSubmit = () => {
    
    const isValidPassword = validPasswords.includes(password);

    if (isValidPassword) {
      // Redirect to the new page
      localStorage.setItem('loggedInPassword', password);
      props.setPassword(password);
      navigate(`/new-page/${password}`);
    }
  };

  return (
    
    <div className='home'>
      <br></br><br></br>
      <div className='wrapper'>
        <center>
      <h2 className='typing-demo'>Welcome to the Home Page!</h2>
      </center>
      
      </div >
      <br></br>
      <br></br><br></br><br></br><br></br>
      <center>
      <div className='login'>
        <br></br>
      <p className='epal'>Enter password And login</p>
      <input
        className='input-box'
        type="password"
        value={password}
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <button className='btn' onClick={handlePasswordSubmit}>Submit</button>
      </div>
      </center>
          </div>
  );
};

export default Home;

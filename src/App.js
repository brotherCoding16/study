import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import NewWindow from './NewWindow';
import Home from './Home';

const App = () => {
  const [password,setPassword] = useState('');

  return (
    
    <Router>
        <Routes>
        <Route exact path="/" element={<Home setPassword={setPassword}/>}/>
        <Route path="/new-page/:password" element={<NewWindow pass={password} setPassword={setPassword}/>} />
        </Routes>
    </Router>
    
  );
};

export default App;

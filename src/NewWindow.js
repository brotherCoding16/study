import ExamButton from './ExamButton';
import React, { useState,useEffect } from 'react';
import "./home.css";
import "./das.css";
// import { useNavigate } from 'react-router-dom';


const NewWindow = (props) => {
  // const { password } = props.pass;
  const [selectedContent, setSelectedContent] = useState(null); // Stores selected child folder ("code" or "note")
  const [practiceOption, setPracticeOption] = useState(null);
  // const navigate = useNavigate();
  //const [password,setPassword] = useState("");

  useEffect(() => {
    const storedPassword = localStorage.getItem('loggedInPassword');
    //console.log(storedPassword);
    if (storedPassword !== null) {
      props.setPassword(storedPassword);
      // navigate(`/new-page/${storedPassword}`);
    }
  }, [props]);


  

  const handleExamClick = () => {
    // Define the behavior when the "Exam" button is clicked
    console.log('Exam button clicked');
    // Add your logic for handling the exam button click
  };

  const handleFileUpload = (file) => {
    // Handle the uploaded file here
    console.log('File uploaded:', file);
    // Add your logic for handling the uploaded file
  };
  
  const handleJoinMeet = () => {
    //console.log(props.pass);
    if(props.pass==="mahdir10") window.open("https://meet.google.com/dbp-pfmf-kas", '_blank');
    if(props.pass==="afiqrcs15") window.open("https://meet.google.com/fud-vqam-vpx", '_blank');
    if(props.pass==="esha10") window.open("https://meet.google.com/oas-xpop-muv", '_blank');
    if(props.pass==="afsana10") window.open("https://meet.google.com/hij-fydk-fqh", '_blank');
    if(props.pass==="abir10") window.open("https://meet.google.com/kau-tmiz-wpa", '_blank');
  };

  const handleContentSelect = (content) => {
    setSelectedContent(content);
  };

  const handlePracticeOption = (content) => {
    setPracticeOption(content);
  };

  const renderContentFolder = () => {
    return (
      <div className='content'>
        
        <h2 >Contents</h2>
        <hr></hr>
        <hr></hr>
        <br></br>
        {(props.pass === "mahdir10" || props.pass === "afiqrcs15") && (
        <button className='code' onClick={() => handleContentSelect('code')}>Codes</button>)}&nbsp;&nbsp;
        <button className='note' onClick={() => handleContentSelect('note')}>Notes</button><p>&nbsp;&nbsp;</p>
        {/* <br className='past-m'></br><br className='past-e'></br> */}
        &nbsp;&nbsp;<button className='past' onClick={() => handleContentSelect('Past Exams')}>Past Exams</button>
      </div>
    );
  };

  const renderSelectedContent = () => {
    if (selectedContent) {
      switch (selectedContent) {
        case 'code':
          return (
            <div className='content_code'>
              <h2>Codes</h2>
              <iframe src="https://drive.google.com/embeddedfolderview?id=10PkiuB4krPIR8isYEBAtbuYIthwGNaRZ" title='1' width="100%" height="250" frameborder="0"></iframe>
            </div>
          );
        case 'note':
          return (
            <div className='content_note'>
              <h2>Notes</h2>
              {/* Add your notes or documents here */}
              {(props.pass === "mahdir10" || props.pass === "afiqrcs15") && (<iframe src="https://drive.google.com/embeddedfolderview?id=10NPsNZFDNzhw6tvqgV-HJstsTk5yRNQA" title='2' width="100%" height="250" frameborder="0"></iframe>)}
              {props.pass === "esha10" && (<iframe src="https://drive.google.com/embeddedfolderview?id=1jMhdKE9pC1r7kkObo6QLlMzpHIlb8r3e" title='78' width="100%" height="250" frameborder="0"></iframe>)}
              {props.pass === "afsana10" && (<iframe src="https://drive.google.com/embeddedfolderview?id=1QROa2Mqg0fDjSmhkXOcoef757gMyGvt_" title='56' width="100%" height="250" frameborder="0"></iframe>)}
              {props.pass === "abir10" && (<iframe src="https://drive.google.com/embeddedfolderview?id=1Hl6NbhW913rLG8HT1E8Ae_96zXYjmFbO" title='56' width="100%" height="250" frameborder="0"></iframe>)}
            </div>
          );
          case 'Past Exams':
          return (
            <div className='content_note'>
              <h2>Past Exams</h2>
              {/* Add your notes or documents here */}
              {(props.pass === "mahdir10" || props.pass === "afiqrcs15") && (<iframe src="https://drive.google.com/embeddedfolderview?id=1GN0ZCU-lDk-S33IYl9ENnVMejQr-QiIh" title='00' width="100%" height="250" frameborder="0"></iframe>)}
              {(props.pass === "esha10" || props.pass === "afiqrcs15") && (<iframe src="https://drive.google.com/embeddedfolderview?id=1JFoYfipJ2DvpiQzVG_be7gdmOQ8ucuYH" title='00' width="100%" height="250" frameborder="0"></iframe>)}
              {(props.pass === "afsana10" || props.pass === "afiqrcs15") && (<iframe src="https://drive.google.com/embeddedfolderview?id=1oN6ZnH6BrV40Xry7gct2IBO5kOiWD4Po" title='00' width="100%" height="250" frameborder="0"></iframe>)}
              {(props.pass === "abir10" || props.pass === "afiqrcs15") && (<iframe src="https://drive.google.com/embeddedfolderview?id=1wIwemrIK3Te5LzY9H63OabPg8QnEKhtY" title='00' width="100%" height="250" frameborder="0"></iframe>)}
            </div>
          );
        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const renderPracticeContent = () => {
    if (practiceOption) {
      switch (practiceOption) {
        case 'option11':
          return (
            <div className='prat'>
            <h1>I/O Operation problems</h1>
            <iframe src="https://drive.google.com/embeddedfolderview?id=10yd3DRSsG3wtEGCQPlfFLoxlNg-v7nU6" title='3' width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option1':
          return (
            <div className='prat'>
            <h1>if-else problems</h1>
            <iframe src="https://drive.google.com/embeddedfolderview?id=10m-Bj2GBQ23VyNic3tUV6Wj9R2BxBpZ0" title='4' width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option2':
          return (
            <div className='prat'>
            <h1>swtich-case problems</h1>
            <iframe src="https://example.com/swtich-case" title='5' width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option3':
          return (
            <div className='prat'>
            <h1>loop problems</h1>
            <iframe src="https://drive.google.com/embeddedfolderview?id=1111RlTvWPTrLCRKxu9fi3SRfJw_FZFyO" title='6' width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option4':
          return (
            <div className='prat'>
            <h1>array problems</h1>
            <iframe src="https://example.com/array" title='7' width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option5':
          return (
            <div className='prat'>
            <h1>string problems</h1>
            <iframe src="https://example.com/string" title='8' width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        // ... add more cases as needed
        default:
          return null;
      }
      
    } else {
      return null;
    }
  };
  const renderPracticeDropdown = () => {
    return (
      <div className='pra'>
        <center>
          <h2 className='pr'>Practice</h2>
          <hr></hr><hr></hr>
          <br></br>
        <button onClick={() => handlePracticeOption('select')} className='practies'>Practice</button> <br></br><br></br>
        {practiceOption === 'select' &&  (
          
          <select className='sel' onChange={(e) => handlePracticeOption(e.target.value)}>
            <option value="option0">Select</option> 
            <option value="option11">I/O-Operation</option>
            <option value="option1">if-else</option>
            <option value="option2">switch</option>
            <option value="option3">loop</option>
            <option value="option4">array</option>
            <option value="option5">string</option>
            {/* Add more options as needed */}
          </select>
        )}
        </center>
      </div>
    );
  };

  return (
    
    
    <div> 
      <div className='oc'>
        <h2>ONLINE CLASS</h2>
      </div>
      <br></br>
      <div className='live'>
        <h2>Live Class Link</h2>
        <hr></hr>
        <hr></hr>
        <br></br>
      <button onClick={handleJoinMeet} className='join'>&nbsp;&nbsp;Join&nbsp;&nbsp;</button>
      </div>
      
      <br />
      {renderContentFolder()}
      <br />
      {renderSelectedContent()}
      {/* New button added here */}
      <br/>
      { (props.pass === "mahdir10" || props.pass === "afiqrcs15" ) && (
    <>
      {renderPracticeDropdown()}
      {renderPracticeContent()}
    </>
  )}
  <br></br><br></br>
  {(props.pass === "mahdir10" || props.pass === "afiqrcs15" || props.pass==="esha10" || props.pass==="afsana10" || props.pass === "abir10") && (
        <ExamButton password={props.pass} handleExamClick={handleExamClick} handleFileUpload={handleFileUpload} />
      )}
    
    </div>
  
  );
};

export default NewWindow;

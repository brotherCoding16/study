import React, { useState,useEffect } from 'react';

const NewWindow = (props) => {
  // const { password } = props.pass;
  const [selectedContent, setSelectedContent] = useState(null); // Stores selected child folder ("code" or "note")
  const [practiceOption, setPracticeOption] = useState(null);
  //const [password,setPassword] = useState("");

  useEffect(() => {
    const storedPassword = localStorage.getItem('loggedInPassword');
    if (storedPassword !== null) {
      props.setPassword(storedPassword);
    }
  }, [props]);

  const handleJoinMeet = () => {
    console.log(props.pass);
    if(props.pass==="mahdir10") window.open("https://meet.google.com/gqh-urnz-ixd", '_blank');
    if(props.pass==="afiqrcs15") window.open("https://meet.google.com/fud-vqam-vpx", '_blank');
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
        <br></br>
        <hr></hr>
        <hr></hr>
        <br></br>
        {(props.pass === "mahdir10" || props.pass === "afiqrcs15") && (
        <button className='code' onClick={() => handleContentSelect('code')}>Codes</button>)}&nbsp;&nbsp;
        <button className='note' onClick={() => handleContentSelect('note')}>Notes</button>
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
              <iframe src="https://drive.google.com/embeddedfolderview?id=10PkiuB4krPIR8isYEBAtbuYIthwGNaRZ" width="100%" height="250" frameborder="0"></iframe>
            </div>
          );
        case 'note':
          return (
            <div className='content_note'>
              <h2>Notes</h2>
              {/* Add your notes or documents here */}
              <iframe src="https://drive.google.com/embeddedfolderview?id=10NPsNZFDNzhw6tvqgV-HJstsTk5yRNQA" width="100%" height="250" frameborder="0"></iframe>
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
            <iframe src="https://drive.google.com/embeddedfolderview?id=10yd3DRSsG3wtEGCQPlfFLoxlNg-v7nU6" width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option1':
          return (
            <div className='prat'>
            <h1>if-else problems</h1>
            <iframe src="https://drive.google.com/embeddedfolderview?id=10m-Bj2GBQ23VyNic3tUV6Wj9R2BxBpZ0" width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option2':
          return (
            <div className='prat'>
            <h1>swtich-case problems</h1>
            <iframe src="https://example.com/swtich-case" width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option3':
          return (
            <div className='prat'>
            <h1>loop problems</h1>
            <iframe src="https://drive.google.com/embeddedfolderview?id=1111RlTvWPTrLCRKxu9fi3SRfJw_FZFyO" width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option4':
          return (
            <div className='prat'>
            <h1>array problems</h1>
            <iframe src="https://example.com/array" width="100%" height="250" frameBorder="0"></iframe>
            </div>
          );
        case 'option5':
          return (
            <div className='prat'>
            <h1>string problems</h1>
            <iframe src="https://example.com/string" width="100%" height="250" frameBorder="0"></iframe>
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
        <button onClick={() => handlePracticeOption('select')} className='practies'>Practice</button> <br></br><br></br>
        {practiceOption === 'select' && (
          
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
        <br></br>
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
      { (props.pass === "mahdir10" || props.pass === "afiqrcs15") && (
    <>
      {renderPracticeDropdown()}
      {renderPracticeContent()}
    </>
  )}
  <br></br><br></br><br></br>
    </div>
  );
};

export default NewWindow;

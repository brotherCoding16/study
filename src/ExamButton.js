import React, { useRef, useState, useEffect } from 'react';
import "./exam.css";

const ExamButton = ({ password, handleExamClick, handleFileUpload }) => {
  const fileInputRef = useRef(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [showAnswerScripts, setShowAnswerScripts] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showPDF, setShowPDF] = useState(localStorage.getItem('showPDF') === 'true');
  const [timeRemaining, setTimeRemaining] = useState('');

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFileUpload(selectedFiles);
    setUploadedFiles(selectedFiles);
    fileInputRef.current.value = null;
  };

  const sendFilesToTelegram = async () => {
    try {
      if (uploadedFiles.length > 0 && !isSending) {
        setIsSending(true);

        const chatId = '1203766378'; // Replace with the actual chat ID
        const botToken = 'YOUR_BOT_TOKEN'; // Replace with your actual bot token

        for (const file of uploadedFiles) {
          const formData = new FormData();
          formData.append('chat_id', chatId);
          formData.append('document', file);

          await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: 'POST',
            body: formData,
          });
        }
        setUploadedFiles([]);
        setShowSuccessAlert(true);
        console.log('Files sent successfully to Telegram!');
      }
    } catch (error) {
      console.error('Error sending files to Telegram:', error);
    } finally {
      setIsSending(false);
    }
  };

  const toggleAnswerScripts = () => {
    setShowAnswerScripts(!showAnswerScripts);
  };

  const handleExamButtonClick = () => {
    setShowFileUpload(!showFileUpload);
    setUploadedFiles([]);
    handleExamClick();
  };

  useEffect(() => {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(16, 5, 0, 0); // 9 PM

    if (now > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1); // Set for the next day if current time is past 9 PM
    }

    const timeUntilTarget = targetTime - now;

    if (timeUntilTarget <= 0) {
      setShowPDF(true);
      localStorage.setItem('showPDF', 'true');
      setTimeRemaining('');
    } else {
      const timer = setTimeout(() => {
        setShowPDF(true);
        localStorage.setItem('showPDF', 'true');
        setTimeRemaining('');
      }, timeUntilTarget);

      // Update time remaining every second
      const interval = setInterval(() => {
        const now = new Date();
        const remaining = targetTime - now;

        if (remaining <= 0) {
          setShowPDF(true);
          localStorage.setItem('showPDF', 'true');
          setTimeRemaining('');
          clearInterval(interval);
        } else {
          const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((remaining / (1000 * 60)) % 60);
          const seconds = Math.floor((remaining / 1000) % 60);
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div className='exam'>
      <h2>Exam</h2>
      <hr />
      <hr />
      <br />
      <button onClick={handleExamButtonClick} className='exam-btn'>
        &nbsp;&nbsp;Exam Window&nbsp;&nbsp;
      </button>
      <br />
      
      {showFileUpload && (
        <>
          <div className='question'>
            {password === 'afsana10' || password === 'abir10' ?
              showPDF ? (
                <iframe src={require('./Question/River-Boat.pdf')} title='7' width="100%" height="800" frameBorder="0"></iframe>
              ) : (
                <p>The PDF will be available in {timeRemaining}.</p>
              ) : <p>Question</p>
            }
          </div>
          <br />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
            multiple
          />
          <button onClick={() => fileInputRef.current.click()} className='upload-btn'>
            &nbsp;&nbsp;Upload Files&nbsp;&nbsp;
          </button>
          <br />
          
          {uploadedFiles.length > 0 && (
            <>
              <div className='upload'>
                <p className='file'>Uploaded Files:</p>
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      <a href={URL.createObjectURL(file)} download={file.name}>
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <br />
                <button onClick={sendFilesToTelegram} className='send-btn' disabled={isSending}>
                  &nbsp;&nbsp;Submit Script&nbsp;&nbsp;
                </button>
              </div>
            </>
          )}
          <br />
          <button className='send-btn' onClick={toggleAnswerScripts}>
            &nbsp;&nbsp;Answer Scripts&nbsp;&nbsp;
          </button>
          
          {showAnswerScripts && (
            <div className='upload'>
              <p className='que'>Your Script</p>
            </div>
          )}
        </>
      )}
      
      {showSuccessAlert && (
        <div className='alert'>
          <p>File(s) sent successfully</p>
          <button onClick={() => setShowSuccessAlert(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ExamButton;

import React, { useRef, useState } from 'react';
import "./exam.css";

const ExamButton = ({ handleExamClick, handleFileUpload }) => {
  const fileInputRef = useRef(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [showAnswerScripts, setShowAnswerScripts] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for showing success alert

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
        const botToken = '7015812392:AAHZiE44iWppaf1ZBtc-vft4SaZKXwfyqqQ'; // Replace with your actual bot token

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

        // Set showSuccessAlert to true when files are sent successfully
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
            <p className='que'>Question</p>
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
          
          {/* Render Answer Scripts div conditionally */}
          {showAnswerScripts && (
            <div className='upload'>
              <p className='que'>Your Script</p>
            </div>
          )}
        </>
      )}
      
      {/* Success alert */}
      {showSuccessAlert && (
        <div className='alert'>
          <p>File(s) sent successfully</p>
          <button  onClick={() => setShowSuccessAlert(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ExamButton;

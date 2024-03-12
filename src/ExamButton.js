import React, { useRef, useState } from 'react';

const ExamButton = ({ handleExamClick, handleFileUpload }) => {
  const fileInputRef = useRef(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSending, setIsSending] = useState(false);

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

        // Optionally, you can show a success message or perform other actions
        console.log('Files sent successfully to Telegram!');
      }
    } catch (error) {
      console.error('Error sending files to Telegram:', error);
      // Handle error, show an error message, etc.
    } finally {
      setIsSending(false);
    }
  };

  const handleExamButtonClick = () => {
    setShowFileUpload(!showFileUpload);
    setUploadedFiles([]);
    handleExamClick();
  };

  return (
    <div className='exam'>
      <button onClick={handleExamButtonClick} className='exam-btn'>
        &nbsp;&nbsp;Submit Scripts&nbsp;&nbsp;
      </button>
      <br />
      <br />
      {showFileUpload && (
        <>
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
              <p>Uploaded Files:</p>
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
              {/* Send button */}
              <button onClick={sendFilesToTelegram} className='send-btn' disabled={isSending}>
                &nbsp;&nbsp;Send&nbsp;&nbsp;
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ExamButton;

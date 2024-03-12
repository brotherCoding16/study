import React, { useState } from 'react';

const DiscussionForum = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleAskQuestion = () => {
    if (newQuestion.trim() !== '') {
      const newQuesObj = {
        user,
        question: newQuestion,
        timestamp: new Date().toISOString(),
        answer: null, // Initially, the answer is set to null
      };

      setQuestions((prevQuestions) => [newQuesObj, ...prevQuestions]);
      setNewQuestion('');
    }
  };

  const handleSelectQuestion = (index) => {
    setSelectedQuestion(index);
  };

  const handleAnswerQuestion = (answer) => {
    if (selectedQuestion !== null) {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[selectedQuestion].answer = answer;
        return updatedQuestions;
      });
      setSelectedQuestion(null);
    }
  };

  return (
    <div className='qna-forum'>
      <h2>Q&A Forum</h2>
      <div>
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder='Ask your question...'
        />
        <button onClick={handleAskQuestion}>Ask</button>
      </div>
      <div className='questions-list'>
        {questions.map((quesObj, index) => (
          <div key={index} className={`question ${index === selectedQuestion ? 'selected' : ''}`}>
            <div>
              <strong>{quesObj.user}:</strong> {quesObj.question}
              <small>{new Date(quesObj.timestamp).toLocaleString()}</small>
            </div>
            {quesObj.answer !== null && (
              <iframe
                title={`Answer to Question ${index}`}
                srcDoc={quesObj.answer}
                width="100%"
                height="200"
                frameBorder="0"
              ></iframe>
            )}
            <button onClick={() => handleSelectQuestion(index)}>Answer</button>
          </div>
        ))}
      </div>
      {selectedQuestion !== null && (
        <div className='answer-input'>
          <textarea
            value={questions[selectedQuestion].answer || ''}
            onChange={(e) => handleAnswerQuestion(e.target.value)}
            placeholder='Write your answer...'
          />
          <button onClick={() => handleAnswerQuestion(questions[selectedQuestion].answer)}>
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;

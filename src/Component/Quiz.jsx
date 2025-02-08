import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
  
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const response = await fetch('/api'); // Replace with actual API endpoint
          const data = await response.json();
          setQuestions(data.questions);
        } catch (error) {
          console.error('Error fetching quiz data:', error);
        }
      };
      fetchQuestions();
    }, []);
    
  
    const handleAnswerClick = (isCorrect, index) => {
      setSelectedAnswer(index); // Store selected answer index
      if (isCorrect) {
  
        setScore(score + 1);
      }
  
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null); // Reset selected answer for the next question
        } else {
          setShowScore(true);
        }
      }, 1000);
    };
  
    const resetQuiz = () => {
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowScore(false);
      setSelectedAnswer(null);
    };
  
    if (questions.length === 0) {
      return <h2>Loading questions...</h2>;
    }
  
    return (
      <div className='app'>
      <h1>TestLine Quiz</h1>
        {showScore ? (
          <div className='score-section'>
            <h2 style={{fontWeight: "bold", fontSize: "30px"}}>Your score: {score} out of {questions.length}</h2>
            <h3 style={{fontSize: "20px"}}>Correct Answers:</h3>
          <ul>
            {questions.map((question, qIndex) => (
              <li key={qIndex}>
                <strong>{qIndex + 1}. {question.description}</strong>
                <ul>
                  {question.options.map((option, oIndex) => (
                    <li key={oIndex} style={{ color: option.is_correct ? 'green' : 'red' }}>
                      {option.description} {option.is_correct ? '(Correct)' : ''}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            </ul>
            <button onClick={resetQuiz} className='btn'>Play Again</button>
          </div>
        ) : (
          <div className='quiz'>
            <h2>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].description}</h2>
            <div className='answer-buttons'>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option.is_correct, index)}
                  className={`btn 
                    ${selectedAnswer !== null ? (option.is_correct ? 'bg-green-500' : selectedAnswer === index ? 'bg-red-500' : '') : ''}`
                  }
                  disabled={selectedAnswer !== null} // Disable all buttons after selection
                >
                  {option.description}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
export default Quiz;

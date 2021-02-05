import React, { useEffect, useState } from 'react';
import db from '../db.json';

import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuestionWidget from '../src/components/QuestionWidget';
import ResultWidget from '../src/components/ResultWidget';
import LoadingWidget from '../src/components/LoadingWidget';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];

  const addResult = (result) => {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  };

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 200);
  }, []);

  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }

    // return nextQuestion < totalQuestions
    //   ? setQuestionIndex(questionIndex + 1)
    //   : setScreenState(screenStates.RESULT);
  };

  return (
    <QuizBackground>
      <QuizContainer>
        <QuizLogo />

        { screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmit}
          addResult={addResult}
        />
        )}
        { screenState === screenStates.LOADING && <LoadingWidget />}

        { screenState === screenStates.RESULT && <ResultWidget results={results} />}

      </QuizContainer>
    </QuizBackground>
  );
}

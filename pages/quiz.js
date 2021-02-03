import React, { useEffect, useState } from 'react';
import db from '../db.json';

import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuestionWidget from '../src/components/QuestionWidget';
import LoadingWidget from '../src/components/LoadingWidget';

// const LoadingWidget = () => (
//   <Widget>
//     <Widget.Header>
//       Carregando...
//     </Widget.Header>

//     <Widget.Content>
//       [Desafio do Loading]
//     </Widget.Content>
//   </Widget>
// );

// const QuestionWidget = ({
//   question, totalQuestions, questionIndex, onSubmit,
// }) => {
//   const questionId = `question__${questionIndex}`;

//   const handlerSubmit = (eventInfos) => {
//     eventInfos.preventDefault();
//     onSubmit();
//   };

//   return (
//     <Widget>
//       <Widget.Header>
//         <h3>
//           {`Pergunta ${questionIndex + 1} de${totalQuestions}`}
//         </h3>
//       </Widget.Header>

//       <img
//         alt="Descrição"
//         style={{
//           width: '100%',
//           height: '150px',
//           objectFit: 'cover',
//         }}
//         src={question.image}
//       />
//       <Widget.Content>
//         <h2>
//           {question.title}
//         </h2>

//         <p>
//           {question.description}
//         </p>

//         <form onSubmit={handlerSubmit}>
//           {question.alternatives.map((alternative, alternativeIndex) => {
//             const alternativeId = `alternative__${alternativeIndex}`;

//             return (
//               <Widget.Topic
//                 as="label"
//                 htmlFor={alternativeId}
//               >
//                 <input
//                   style={{ display: 'none' }}
//                   id={alternativeId}
//                   name={questionId}
//                   type="radio"
//                 />
//                 {alternative}
//               </Widget.Topic>
//             );
//           })}

//           {/* <pre>
//             {JSON.stringify(question.alternatives, null, 4)}
//           </pre> */}

//           <Button type="submit">
//             Confirmar
//           </Button>
//         </form>
//       </Widget.Content>
//     </Widget>
//   );
// };

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'QUIZ',
};

export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 500);
  }, []);

  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) setQuestionIndex(questionIndex + 1);

    setScreenState(screenStates.RESULT);
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
        />
        )}
        { screenState === screenStates.LOADING && <LoadingWidget />}

        { screenState === screenStates.RESULT && <div>Acertou!!</div>}

      </QuizContainer>
    </QuizBackground>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AnswerList from '../AnswerList/AnswerList.jsx';
import Answer from '../Answer/Answer.jsx';
import Question from '../Question/Question.jsx';
import MoreQuestions from '../MoreQuestions/MoreQuestions.jsx';
import AddQuestion from '../AddQuestion/AddQuestion.jsx';
import AnswerModal from '../AnswerModal/AnswerModal.jsx';
import QuestionModal from '../QuestionModal/QuestionModal.jsx';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 80%;
`;

const MoreQuestionBoxes = styled.section`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 100px;
  width: 80%;
`;

const QuestionList = function(props) {
  const [ showAnswerModal, setShowAnswerModal ] = useState(false);
  const [ showQuestionModal, setShowQuestionModal ] = useState(false);
  const [ clickedQuestion, setClickedQuestion ] = useState(null);const [ showPhotosModal, setShowPhotosModal ] = useState(false);
  const [ showMoreQuestions, setShowMoreQuestions ] = useState(true);
  const [ count, setCount ] = useState(2);
  const isInitialMount = useRef(true);

  // Utilizes a useRef to ensure effect does not fire on mount; only on updates after mounting
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (props.questions.length <= count) {
        setShowMoreQuestions(false);
      }
    }
  }, [count]);

  const toggleAnswerForm = function(bool, query) {
    setShowAnswerModal(bool);
    query && setClickedQuestion(query);
  };

  const toggleQuestionForm = function(bool) {
    setShowQuestionModal(bool);
  };

  const questions = props.questions
    .sort((a,b) => b.question_helpfulness - a.question_helpfulness)
    .map(question => (
      <Section key={question.question_id}>
        <Question
          question={question}
          product={props.product}
          toggleAnswerForm={toggleAnswerForm}
          updateHelp={props.updateHelp}
        />
        <AnswerList
          answers={Object.values(question.answers)}
          updateHelp={props.updateHelp}
        />
      </Section>
    ));

  const togglePhotosModal = function(bool) {
    setShowPhotosModal(bool);
  };

  const handleClose = function(event) {
    const name = event.target.getAttribute('name');
    if (name === 'answer-background' || name === 'answer-close-btn') {
      toggleAnswerForm(false);
    } else if (name === 'photos-background' || name === 'photos-close-btn') {
      togglePhotosModal(false);
    } else if (name === 'question-background' || name === 'question-close-btn') {
      toggleQuestionForm(false);
    }
  };

  const handleClick = function(event) {
    setCount(prev => prev + 2);
  };

  return (
    <Container>
      {// Sort questions in desc order by helpfulness & render a Question component for each sorted question
      questions.length > 2 ? questions.slice(0, count) : questions
      }
      <MoreQuestionBoxes>
        { showMoreQuestions && <MoreQuestions handleClick={handleClick}/> }
        <AddQuestion toggleQuestionForm={toggleQuestionForm}/>
      </MoreQuestionBoxes>

      { showAnswerModal && <AnswerModal
        product={props.product}
        question={clickedQuestion}
        showPhotosModal={showPhotosModal}
        toggleAnswerForm={toggleAnswerForm}
        togglePhotosModal={togglePhotosModal}
        handleClose={handleClose}
      /> }
      { showQuestionModal && <QuestionModal
        product={props.product}
        toggleQuestionForm={toggleQuestionForm}
        handleClose={handleClose}
      />}
    </Container>
  );
}

export default QuestionList;
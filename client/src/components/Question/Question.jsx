import React from 'react';
import styled from 'styled-components';
import Helpful from '../Helpful/Helpful.jsx'

const Container = styled.section`
  display: flex;
  justify-content: space-between;
`;

const StyledQuestion = styled.article`
  font-weight: bold;
  justify-self: start;
  width: 60%;
`;

const HelpfulAndAddAnswer = styled.article`
  display: flex;
  flex-wrap: nowrap;
  font-size: 12px;
  justify-self: end;
  justify-content: space-around;
  max-width: 250px;
  min-width: 200px;
`;

const StyledText = styled.p`
  :hover {
    cursor: pointer;
  }
`;

const Question = function({ question, product, toggleAnswerForm, updateHelp }) {
  const handleClick = function(event) {
    toggleAnswerForm(true, question);
  };

  return (
    <Container>
      <StyledQuestion>
        <p>Q: {question.question_body}</p>
      </StyledQuestion>
      <HelpfulAndAddAnswer>
        <Helpful
          question={question.question_id}
          helpful={question.question_helpfulness}
          updateHelp={updateHelp}
        />
        <p>|</p>
        <StyledText onClick={handleClick}><u>Add Answer</u></StyledText>
      </HelpfulAndAddAnswer>
    </Container>
  );
};

export default Question;
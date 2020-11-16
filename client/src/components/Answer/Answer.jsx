import React from 'react';
import Helpful from '../Helpful/Helpful.jsx';
import styled from 'styled-components';

const StyledArticle = styled.article`
  display: flex;
  justify-content: start;
`;

const Answer = function(props) {
  return (
    <section>
      <h1>A: {props.answer}</h1>
      <StyledArticle>
        <p>by {props.user.name}, {props.user.date}</p>
        |
        <Helpful helpful={props.helpful}/>
        |
        <p>Report</p>
      </StyledArticle>
    </section>
  );
};

export default Answer;
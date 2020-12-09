import React from 'react';
import dateFormat from 'dateformat';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { Thumbnails, Image } from '../AnswerModal/styles.js';
import Helpful from '../Helpful/Helpful.jsx';
import Report from '../Report/Report.jsx';

const Container = styled.section`
  font-size: 12px;
  justify-content: space-around;
`;

const StyledAnswer = styled.article`
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
`;

const AnswerMetadata = styled.article`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin-left: 20px;
  width: 375px;
`;

const Answer = function(props) {
  // Helper Function for formatting date
  const transformDate = function(date) {
    let updated = new Date(props.answer.date);
    return dateFormat( updated, 'mmmm d, yyyy');
    /*updated = updated.toString().split(' ').slice(1, 4);
    updated[1] = updated[1].concat(',');
    return updated.join(' ');*/
  }

  return (
    <Container>
      <StyledAnswer>
        <p><strong style={{ fontSize: '16px'}}>A: </strong> {props.answer.body}</p>
      </StyledAnswer>
      <Thumbnails style={{ width: '375px' }}>
        {props.answer.photos && props.answer.photos.map(photo => <Image src={photo}/>)}
      </Thumbnails>
      <AnswerMetadata>
        <p>by {props.answer.answerer_name}, {transformDate(props.answer.date)}</p>
        <p>|</p>
        <Helpful
          answer={props.answer.id}
          helpful={props.answer.helpfulness}
          updateHelp={props.updateHelp}
        />
        <p>|</p>
        <Report answer={props.answer.id}/>
      </AnswerMetadata>
    </Container>
  );
};

export default Answer;
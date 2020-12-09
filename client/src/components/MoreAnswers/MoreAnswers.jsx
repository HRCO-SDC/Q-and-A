import React, { useState } from 'react';
import styled from 'styled-components';

const StyledArticle = styled.article`
  font-weight: bold;
  font-size: 12px;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const MoreAnswers = function(props) {
  const [ showAnswers, setShowAnswers ] = useState(false);
  const [ showMoreLabel, setShowMoreLabel ] = useState(true);

  const handleClick = function(event) {
    setShowAnswers(prev => !prev);
    setShowMoreLabel(prev => !prev);
  };

  return (
    <>
      { showMoreLabel && <StyledArticle>
        <p onClick={handleClick}>LOAD MORE ANSWERS</p>
      </StyledArticle> }
      { showAnswers && props.answers }
    </>

  );
};

export default MoreAnswers;
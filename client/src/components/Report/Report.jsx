import React, { useState } from 'react';
import axios from 'axios';
import { Underscore } from '../AnswerModal/styles.js';

const Report = function (props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = function (event) {
    setClicked(true);
    axios.put(`http://localhost:3003/qa/answer/${props.answer}/report`)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  return (
    <p>
      { clicked ?
        <u onClick={handleClick}>Reported</u> :
        <Underscore onClick={handleClick}>Report</Underscore>
      }
    </p>
  );
};

export default Report;
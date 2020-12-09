import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ModalBackground, ExitModalArticle, ExitModalBtn, ModalContent, ModalForm, ModalTextarea, ModalInput, ModalLabel, StyledButton, StyledInput, StyledText,Thumbnails, Image } from './styles.js';
import { handleChange, handleSubmit } from './helpers.js';
import PhotosModal from '../PhotosModal/PhotosModal.jsx';

const AnswerModal = function({ product, question,showPhotosModal, toggleAnswerForm, togglePhotosModal, handleClose }) {
  const [ answer, setAnswer ] = useState(
    { body: '', name: '', email: '', photos: null });
  const [ error, setError ] = useState(null);

  // Updates state with uploaded photos
  const handleUpload = function(pictures) {
    /*
    let fdPictures = pictures.map(pic => {
      let fd = new FormData();
      fd.append('image', pic);
      console.log(fd);
      return fd;
    });*/

    setAnswer(prev => {
      let updated = Object.assign({}, prev);
      updated.photos = pictures;
      return updated;
    });
    togglePhotosModal(false);
  };

  const handleClick = function(event) {
    // Use this to open photo model
    event.preventDefault();
    togglePhotosModal(true);
  };

  return (
    <>
      <ModalBackground
        onClick={handleClose}                name='answer-background'
      >
        <ModalContent>
          <ExitModalArticle>
            <ExitModalBtn onClick={handleClose} name='answer-close-btn'>X</ExitModalBtn>
          </ExitModalArticle>
          <h2>Submit your Answer</h2>
          <h3>{product.name}:  {question.question_body}</h3>
          <ModalForm onSubmit={() => handleSubmit(event, toggleAnswerForm, answer, `${question.question_id}/answers`, setError)}>
            <ModalLabel>Your Answer*
              <ModalTextarea
                type='text'
                name='body'
                value={answer.body}
                onChange={() => handleChange(event, setAnswer)}/>
            </ModalLabel>
            <br/>
            <ModalLabel>What is your nickname?*
              <ModalInput
                placeholder='Example: jack543!'
                type='text'
                name='name'
                value={answer.name}
                onChange={() => handleChange(event, setAnswer)}/>
            </ModalLabel>
            <StyledText>
              <p>For privacy reasons, do not use your full name or email address</p>
            </StyledText>
            <br/>
            <ModalLabel>Your email*
              <ModalInput
                type='text'
                name='email'
                value={answer.email}
                onChange={() => handleChange(event, setAnswer)}/>
            </ModalLabel>
            <StyledText>
              <p>For authentication reasons, you will not be emailed</p>
            </StyledText>
            <br/>
            <StyledButton onClick={handleClick}>Upload photos
            </StyledButton>
            <br/>
            <Thumbnails>
              { answer.photos && answer.photos.map(photo => <Image key={uuidv4()} src={photo}/>) }
            </Thumbnails>
            <br/>
            <StyledInput type='submit' value='Submit'/>
          </ModalForm>
          {error && <p>{error}</p>}
        </ModalContent>
      </ModalBackground>
      {showPhotosModal && <PhotosModal handleClose={handleClose} handleUpload={handleUpload}/>}
    </>
  );
}

export default AnswerModal;
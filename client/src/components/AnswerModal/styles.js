import styled from 'styled-components';

export const ModalBackground = styled.section`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  left: 0;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const ModalContent = styled.article`
  align-items: center;
  background-color: seashell;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  margin: 5% auto;
  padding: 20px;
  width: 70%;
`;

export const ExitModalArticle = styled.article`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const ExitModalBtn = styled.button`
  width: 30px;
  &:hover {
    cursor: pointer;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
`;

export const ModalLabel = styled.label`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  text-align: right;
`;

export const ModalInput = styled.input`
  margin-left: 10px;
  width: 55%;
`;

export const ModalTextarea = styled.textarea`
  margin-left: 10px;
  width: 55%;
`;

export const StyledText = styled.article`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

export const StyledInput = styled.input`
  align-self: center;
  border-radius: 10px;
  width: 75px;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledButton = styled.button`
  align-self: center;
  border-radius: 10px;
  width: 75px;
  &:hover {
    cursor: pointer;
  }
`;

export const Thumbnails = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`;

export const Image = styled.img`
  border: 1px solid black;
  height: 50px;
  justify-self: center;
  margin: 5px;
  width: 50px;
`;

export const Underscore = styled.u`
  &:hover {
    cursor: pointer;
  }
`;

export const Box = styled.article`
  border: 1px solid black;
  font-size: 16px;
  font-weight: bold;
  margin-left: 0px;
  margin-right: 10px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;
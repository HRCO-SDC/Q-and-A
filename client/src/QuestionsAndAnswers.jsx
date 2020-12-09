import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import QuestionList from './components/QuestionList/QuestionList.jsx';

const Container = styled.section`
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
`;

const QuestionsAndAnswers = function(props) {
  // State
  const [ questions, setQuestions ] = useState([]);
  const [ product, setProduct ] = useState(null);
  const [ helpCount, setHelpCount ] = useState(0);
  const [ filtered, setFiltered ] = useState([]);

  // Perform GET request on mount based off product id
  // Perform GET request again when helpCount updates
  useEffect(() => {
    let isMounted = true; // Keep track of whether component is mounted
    const id = props.match.params.id || '25'; // React router provides id in props
    // Get questions from API & set state only if the component is still mounted
    axios.get(`http://52.26.193.201:3000/qa/${id}`)
      .then(response => {
        if (isMounted) {
          setQuestions(response.data.results);
          setFiltered(response.data.results);
        }
      })
      .catch(error => console.log(error));
    // Get product name from API & set state only if the component is still mounted
    axios.get(`http://52.26.193.201:3000/products/${id}`)
      .then(response => {
        if (isMounted) {
          setProduct(response.data);
        }
      })
      .catch(error => console.log(error));
    // This callback fires when the component unmounts to prevent attempts at changing state after the component unmounts
    return () => { isMounted = false };
  }, [helpCount]);

  const updateHelp = function() {
    setHelpCount(prev => prev + 1);
  };

  const filterQuestions = function(search) {
    let regex = new RegExp(`(${search})+`, 'i');
    setFiltered(prev => {
      let copy = [...questions];
      let filtered = copy.filter(question => regex.test(question.question_body));
      return filtered;
    });
  };

  const resetFilter = function(search) {
    setFiltered([...questions]);
  }

  return (
    <Container>
      <SearchBar
        filterQuestions={filterQuestions}
        resetFilter={resetFilter}
      />
      <QuestionList
        questions={filtered}
        product={product}
        updateHelp={updateHelp}/>}
    </Container>
  );
};

export default QuestionsAndAnswers;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import QuestionList from './components/QuestionList/QuestionList.jsx';

const Container = styled.section`
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
`;

const QuestionsAndAnswers = function (props) {
  // State
  const [questions, setQuestions] = useState([]);
  const [product, setProduct] = useState(null);
  const [helpCount, setHelpCount] = useState(0);
  const [filtered, setFiltered] = useState([]);

  // Perform GET request on mount based off product id
  // Perform GET request again when helpCount updates
  useEffect(() => {
    let isMounted = true; // Keep track of whether component is mounted
    const id = props.match.params.id || '1'; // React router provides id in props
    // Get questions from API & set state only if the component is still mounted
    axios.get(`http://localhost:3003/qa/${id}`)
      .then(response => {
        console.log("RESPOnSE", response.data)
        if (isMounted) {
          // removed results from response.data.results
          setQuestions(response.data);
          setFiltered(response.data);
        }
      })
      .catch(error => console.log(error));
    // Get product name from API & set state only if the component is still mounted
    // axios.get(`http://localhost:3003/products/${id}`)
    //   .then(response => {
    //     if (isMounted) {
    //       setProduct(response.data);
    //     }
    //   })
    //   .catch(error => console.log(error));
    // // This callback fires when the component unmounts to prevent attempts at changing state after the component unmounts
    // return () => { isMounted = false };
    // Edit for SDC
    setProduct({
      "id": 25,
      "name": "Alfreda Jacket",
      "slogan": "Quia asperiores natus vero fugiat sint error.",
      "description": "Et voluptatem harum. Et quo odio a aspernatur. Veritatis perspiciatis ipsum autem eius velit blanditiis quia similique enim. Recusandae veniam qui maxime. Sit iste accusamus ea. Dolorum eligendi possimus omnis vitae et eveniet.",
      "category": "Jacket",
      "default_price": "521",
      "features": [
        {
          "feature": "Cut",
          "value": "Skinny"
        },
        {
          "feature": "Material",
          "value": "Armor Weave"
        }
      ]
    })
  }, [helpCount]);

  const updateHelp = function () {
    setHelpCount(prev => prev + 1);
  };

  const filterQuestions = function (search) {
    let regex = new RegExp(`(${search})+`, 'i');
    setFiltered(prev => {
      let copy = [...questions];
      let filtered = copy.filter(question => regex.test(question.question_body));
      return filtered;
    });
  };

  const resetFilter = function (search) {
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
        updateHelp={updateHelp} />
    </Container>
  );
};

export default QuestionsAndAnswers;
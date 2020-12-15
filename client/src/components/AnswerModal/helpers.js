import axios from 'axios';

export const handleChange = function (event, setter) {
  const { name, value } = event.target;
  setter(prev => {
    let newAnswer = Object.assign({}, prev);
    newAnswer[name] = value;
    return newAnswer;
  });
};

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const handleSubmit = function (event, toggler, state, path, setter) {
  event.preventDefault();
  // Only allow submit with body, name, and valid email
  if (state.body && state.name && state.email) {
    if (emailRegex.test(state.email)) {
      const body = {
        "body": state.body,
        "name": state.name,
        "email": state.email
      }
      if (state.photos) {
        body["photos"] = state.photos
      }
      axios.post(`http://localhost:3003/qa/${path}`, body)
        .then(response => console.log(response))
        .then(() => setter(null))
        .catch(error => console.log(error));
      toggler(false);
    } else {
      setter('Provided email address is not in correct email format')
    }
  } else {
    setter('You must enter the following: answer, nickname, and email');
  }
};
import http from 'k6/http';
import { sleep } from 'k6';

// let options = {
//   vus: 1000,
//   duration: '600s',
// };

let thresholds = {
  'failed requests': ['rate<0.01'],
  http_req_duration: ['p(95) < 2000']
}

// export default function () {
//   var url = 'http://localhost:3003/qa/1';

//   var payload = JSON.stringify({
//     question_body: 'test',
//     asker_name: 'test',
//     email: 'testing@test.com'
//   });

//   http.get(url);
// http.post(url, payload);

// }



export default function () {
  var url = 'http://localhost:3003/qa/11/answers';

  var payload = JSON.stringify({
    answer_body: 'test',
    answerer_name: 'test',
    photo: 'test',
    email: 'testing@test.com'
  });

  http.get(url);
  // http.post(url, payload);

}
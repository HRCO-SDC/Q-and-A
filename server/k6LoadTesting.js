import http from 'k6/http';
import { check, sleep } from 'k6';

/*
let options = {
  vus: 300,
  duration: '10s',
  thresholds: {
    'failed requests': ['rate<0.01'],
    http_req_duration: ['p(95) < 2000']

  }
};

// let thresholds = {
//   'failed requests': ['rate<0.01'],
//   http_req_duration: ['p(95) < 2000']
// }

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
  var url = 'http://localhost:3003/qa/54/answers';

  // var payload = JSON.stringify({
  //   answer_body: 'test',
  //   answerer_name: 'test',
  //   photos: [{ "url": "TEST" }],
  //   email: 'testing@test.com'
  // });
  const checker = http.get(url)
  check(checker
    , {
      'status was 200': (res) => res.status === 100
    });
  // http.post(url, payload);
}


*/

export let options = {
  vus: 200,
  duration: '30s',
  thresholds: {
    // 99% of requests must finish within 2000ms.
    http_req_duration: ['p(99) < 2000'],
  },
};

export default function () {
  const id = Math.floor(Math.random() * 1000000);
  // const load = `http://localhost:3003/qa/${id}/answers`;

  const nginx = `http://3.12.102.56/qa/${id}/answers`;
  // const localhost = `http://localhost:5000/reviews/5168867/list?count=10&relevance`;
  const url = http.post(nginx);
  check(url, { 'status was 200': (r) => r.status == 200 });
}
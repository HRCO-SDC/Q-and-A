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
export default function () {
  var url = 'http://localhost:3003/qa/1/answers';

  http.get(url);
}
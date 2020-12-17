const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream')
const writerQuestions = csvWriter()
const writerAnswers = csvWriter()
const writerPhotos = csvWriter()

const questionRecords = 20;
const answerRecords = 20;
const photoRecords = 20;


let question_id = 1;
const questionGen = () => {
  writerQuestions.pipe(fs.createWriteStream('questionstest.csv'));
  for (let i = 0; i < questionRecords; i++) {
    writerQuestions.write({
      // 'question_id': question_id++,
      'product_id': 1,
      'question_body': faker.lorem.sentence(),
      'question_date': faker.date.past().toDateString(),
      'asker_name': faker.internet.userName(),
      'helpfulness': faker.random.number({ min: 1, max: 50 }),
      'reported': faker.random.number({ min: 0, max: 1 })
    })
  }
  writerQuestions.end();

  console.log('complete')
}
questionGen();


let answer_id = 1;
const answerGen = () => {
  writerAnswers.pipe(fs.createWriteStream('answerstest.csv'));
  for (let i = 0; i < answerRecords; i++) {
    writerAnswers.write({
      // 'answer_id': answer_id++,
      'question_id': faker.random.number({ min: 1, max: questionRecords }),
      'answer_body': faker.lorem.paragraph(),
      'answer_date': faker.date.past().toDateString(),
      'answerer_name': faker.internet.userName(),
      'helpfulness': faker.random.number({ min: 1, max: 50 }),
      'reported': faker.random.number({ min: 0, max: 1 })
    })
  }
  writerAnswers.end();
  console.log('complete')
}
answerGen();


let photo_id = 1;
const photoGen = () => {
  writerPhotos.pipe(fs.createWriteStream('photostest.csv'));
  for (let i = 0; i < photoRecords; i++) {
    writerPhotos.write({
      // 'photo_id': photo_id++,
      'answer_id': faker.random.number({ min: 1, max: answerRecords }),
      'url': faker.image.imageUrl(),
    })
  }
  writerPhotos.end();
  console.log('complete')
}
photoGen();

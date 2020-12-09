const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream')
const writerQuestions = csvWriter()
const writerAnswers = csvWriter()
const writerPhotos = csvWriter()

const records = 10;

let question_id = 1;
const questionGen = () => {
  writerQuestions.pipe(fs.createWriteStream('questions.csv'));
  for (let i = 0; i < records; i++) {
    writerQuestions.write({
      'question_id': question_id++,
      'product_id': 1,
      'question_body': faker.lorem.sentence(),
      'question_date': faker.date.past(),
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
  writerAnswers.pipe(fs.createWriteStream('answers.csv'));
  for (let i = 0; i < records; i++) {
    writerAnswers.write({
      'answer_id': answer_id++,
      'question_id': faker.random.number({ min: 1, max: records }),
      'answer_body': faker.lorem.paragraph(),
      'answer_date': faker.date.past(),
      'answerer_name': faker.internet.userName(),
      'helpfulness': faker.random.number({ min: 1, max: 50 }),
    })
  }
  writerAnswers.end();
  console.log('complete')
}

answerGen();

let photo_id = 1;
const photoGen = () => {
  writerPhotos.pipe(fs.createWriteStream('photos.csv'));
  for (let i = 0; i < records; i++) {
    writerPhotos.write({
      'photo_id': photo_id++,
      'answer_id': faker.random.number({ min: 1, max: records }),
      'url': faker.image.imageUrl(),
    })
  }
  writerPhotos.end();
  console.log('complete')
}

photoGen();

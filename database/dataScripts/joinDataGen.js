const fs = require('fs');
const faker = require('faker');
const ws = fs.createWriteStream('./joinData.tsv');

const joinDataGen = (index) => {
  for (let i = index; i <= 5 * Math.pow(10, 6); i++) {
    const course_id = faker.random.number({min: 1.0, max: 10000000.00});
    const instructor_id = faker.random.number({min: 1.0, max: 10000000.00});

    if (!ws.write(`${course_id}\t${instructor_id}\n`)) {
      ws.once('drain', () => { joinDataGen(i + 1); });
      return;
    }
  }
  ws.end();
};

joinDataGen(1);
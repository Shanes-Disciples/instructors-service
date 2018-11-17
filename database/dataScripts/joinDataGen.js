const fs = require('fs');
const faker = require('faker');
const wstream = fs.createWriteStream('./joinData.tsv');

const joinDataGen = (index) => {
  for (let i = index; i <= 10 * Math.pow(10, 6); i++) {
    const course_id = faker.random.number({min: 1.0, max: 100.0});
    const inst_id = faker.random.number({min: 1.0, max: 50.0});

    if (!wstream.write(`${course_id}\t${inst_id}\n`)) {
      wstream.once('drain', () => { joinDataGen(i + 1); });
      return;
    }
  }
  wstream.end();
};

joinDataGen(1);
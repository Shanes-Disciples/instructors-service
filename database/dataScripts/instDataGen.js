const fs = require('fs');
const faker = require('faker');
const ws = fs.createWriteStream('./instructorData.tsv');

const instructorDataGen = (index) => {
  for (let i = index; i <= 10 * Math.pow(10, 6); i++) {
    const inst_name = faker.name.findName();
    const rating = Math.ceil(Math.random() * 50) / 10;
    const reviews = Math.ceil(Math.random() * 10000);
    const students = Math.floor(Math.random() * 100000);
    const title = faker.lorem.words();
    const blurb = faker.lorem.paragraphs();
    const courses = faker.random.number({min: 1.0, max: 50.0});
    const photo_url = faker.image.imageUrl();

    if (!ws.write(`${inst_name}\t${rating}\t${reviews}\t${students}\t${title}\t${blurb}\t${courses}\t${photo_url}\n`)) {
      ws.once('drain', () => { instructorDataGen(i + 1); });
      return;
    }
  }
  ws.end();
};

instructorDataGen(1);
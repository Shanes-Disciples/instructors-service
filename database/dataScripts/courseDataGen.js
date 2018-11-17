const fs = require('fs');
const faker = require('faker');
const wstream = fs.createWriteStream('./courseData.tsv');

const courseDataGen = (index) => {
  for (let i = index; i <= 10 * Math.pow(10, 6); i++) {
    const course_name = faker.commerce.productName();
    const rating = Math.ceil(Math.random() * 50) / 10;
    const reviews = Math.ceil(Math.random() * 1000);
    const lectures = Math.ceil(Math.random() * 100);
    const num_hours = faker.random.number({min: 1.0, max: 1000.00});
    const full_price = Math.floor(Math.random() * 100000) / 100;
    const disc_price = faker.random.number({min: 1.0, max: 100.0});
    const photo_url = faker.image.imageUrl();

    if (!wstream.write(`${course_name}\t${rating}\t${reviews}\t${lectures}\t${num_hours}\t${full_price}\t${disc_price}\t${photo_url}\n`)) {
      wstream.once('drain', () => { courseDataGen(i + 1); });
      return;
    }
  }
  wstream.end();
};

courseDataGen(1);
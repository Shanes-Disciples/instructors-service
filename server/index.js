/* eslint-disable prefer-arrow-callback */
require('newrelic');
const express = require('express');
const path = require('path');
const pgp = require('pg-promise')();

const config = {
  user: 'czosa',
  host: 'localhost',
  database: 'postgres',
  password: null,
  port: 5432,
};

const db = pgp(config);

const app = express();

app.use('/courses', express.static(path.join(__dirname, '/../client/dist')));

//retrieve course by id
app.get('/courses/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

//retrieve instructors by course id
app.get('/:id/instructors', (req, res) => {
  const instQuery = `SELECT * FROM instructors JOIN joins ON joins.instructor_id = instructors.id WHERE joins.course_id = ${req.params.id};`;
  db.any(instQuery)
    .then((response) => {
      let result = [];
      let count = 0;
      response.map((row) => {
        const courseQuery = `SELECT * FROM courses WHERE id = ${row.course_id};`;
        db.query(courseQuery)
          .then((respo) => {
            count += 1;
            let instWithCourses = Object.assign(row, { courseInfo: respo });
            result.push(instWithCourses);
            if (count === response.length) {
              res.status(201);
              res.send(result);
            }
          })
          .catch((error) => {
            res.status(500);
            res.send(error);
          });
      });
    })
    .catch((error) => {
      res.status(500);
      res.send(error);
    });
});


app.listen(8081, () => {
  console.log("listening on port 8081");
});
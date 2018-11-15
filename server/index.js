/* eslint-disable prefer-arrow-callback */
const express = require('express');
const path = require('path');
const mysql = require('../database/sqlizeIndex.js');

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.get('/instructors/:id', (req, res) => {
  mysql.sequelize.authenticate()
    .then(function getInstructorIds() {
      return mysql.Join.findAll({ where: { course_id: req.params.id } });
    })

    .then(function getAllInstructors(data) {
      const info = [];
      const promises = [];
    
      data.forEach(function getSingleInstructor(inst) {
        const instructor = ({
          id: inst.dataValues.inst_id,
          instInfo: null,
          courseInfo: null,
        });
        const newPromise = mysql.Instructors.findOne({ where: { id: inst.dataValues.inst_id } })

          .then(function getInstructorInfo(instData) {
            instructor.instInfo = instData;
            return mysql.Join.findAll({ where: { inst_id: inst.dataValues.inst_id } });
          })

          .then(function getCourseInfo(courses) {
            return mysql.Courses.findAll({
              where: {
                id: [courses
                  .map(course => course.course_id)
                  .filter(c => c != req.params.id)],
              },
            });
          })

          .then(function pushInfo(courseData) {
            instructor.courseInfo = courseData;
            info.push(instructor);
          });

        promises.push(newPromise);
      });
      return Promise.all(promises)
        .then(() => res.send(info));
    });
});

app.post('/instructors/:id', (req, res) => {
  mysql.sequelize.authenticate()
    .then(function addInstructorIds() {
      return mysql.Join.create({ where: { course_id: req.params.id } });
    })

    .then(function addAllInstructors(data) {
      const info = [];
      const promises = [];
    
      data.forEach(function addSingleInstructor(inst) {
        const instructor = ({
          id: inst.dataValues.inst_id,
          instInfo: null,
          courseInfo: null,
        });
        const newPromise = mysql.Instructors.create({ where: { id: inst.dataValues.inst_id } })

          .then(function addInstructorInfo(instData) {
            instructor.instInfo = instData;
            return mysql.Join.create({ where: { inst_id: inst.dataValues.inst_id } });
          })

          .then(function addCourseInfo(courses) {
            return mysql.Courses.create({
              where: {
                id: [courses
                  .map(course => course.course_id)
                  .filter(c => c != req.params.id)],
              },
            });
          })

          .then(function pushInfo(courseData) {
            instructor.courseInfo = courseData;
            info.push(instructor);
          });

        promises.push(newPromise);
      });
      return Promise.all(promises)
        .then(() => res.send(info));
    });
});

app.put('/instructors/:id', (req, res) => {
  mysql.sequelize.authenticate()
    .then(function updateInstructorIds() {
      return mysql.Join.update({ where: { course_id: req.params.id } });
    })

    .then(function updateAllInstructors(data) {
      const info = [];
      const promises = [];
    
      data.forEach(function updateSingleInstructor(inst) {
        const instructor = ({
          id: inst.dataValues.inst_id,
          instInfo: null,
          courseInfo: null,
        });
        const newPromise = mysql.Instructors.update({ where: { id: inst.dataValues.inst_id } })

          .then(function updateInstructorInfo(instData) {
            instructor.instInfo = instData;
            return mysql.Join.update({ where: { inst_id: inst.dataValues.inst_id } });
          })

          .then(function updateCourseInfo(courses) {
            return mysql.Courses.update({
              where: {
                id: [courses
                  .map(course => course.course_id)
                  .filter(c => c != req.params.id)],
              },
            });
          })

          .then(function pushInfo(courseData) {
            instructor.courseInfo = courseData;
            info.push(instructor);
          });

        promises.push(newPromise);
      });
      return Promise.all(promises)
        .then(() => res.send(info));
    });
});

app.delete('/instructors/:id', (req, res) => {
  mysql.sequelize.authenticate()
    .then(function deleteInstructorIds() {
      return mysql.Join.destroy({ where: { course_id: req.params.id } });
    })

    .then(function deleteAllInstructors(data) {
      const info = [];
      const promises = [];
    
      data.forEach(function deleteSingleInstructor(inst) {
        const instructor = ({
          id: inst.dataValues.inst_id,
          instInfo: null,
          courseInfo: null,
        });
        const newPromise = mysql.Instructors.destroy({ where: { id: inst.dataValues.inst_id } })

          .then(function deleteInstructorInfo(instData) {
            instructor.instInfo = instData;
            return mysql.Join.destroy({ where: { inst_id: inst.dataValues.inst_id } });
          })

          .then(function deleteCourseInfo(courses) {
            return mysql.Courses.destroy({
              where: {
                id: [courses
                  .map(course => course.course_id)
                  .filter(c => c != req.params.id)],
              },
            });
          })

          .then(function pushInfo(courseData) {
            instructor.courseInfo = courseData;
            info.push(instructor);
          });

        promises.push(newPromise);
      });
      return Promise.all(promises)
        .then(() => res.send(info));
    });
});

app.listen(8081, () => {
  console.log("listening on port 8081");
});

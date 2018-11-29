const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'czosa',
  host: 'localhost',
  database: 'postgres',
  password: null,
  port: 5432,
});

console.log('connected to psql database');

const getCoursesById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM courses WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

const getInstructorsById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM instructors JOIN joins ON joins.instructor_id = instructors.id JOIN courses ON courses.id = joins.course_id WHERE joins.course_id = $1;', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

module.exports = {
  getCoursesById,
  getInstructorsById
}
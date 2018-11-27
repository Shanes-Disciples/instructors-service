const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'czosa', null, {
  dialect: 'postgres',
  host: 'localhost',
  language: 'en',
  logging: false
});

const Instructors = sequelize.define('instructors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  inst_name: Sequelize.STRING(255),
  rating: Sequelize.DECIMAL(2, 1),
  reviews: Sequelize.INTEGER,
  students: Sequelize.INTEGER,
  title: Sequelize.STRING,
  blurb: Sequelize.TEXT,
  courses: Sequelize.INTEGER,
  photo_url: Sequelize.STRING(255),
}, {
  timestamps: false,
  underscored: true,
});

const Courses = sequelize.define('courses', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  course_name: Sequelize.STRING(255),
  course_rating: Sequelize.DECIMAL(2, 1),
  reviews: Sequelize.INTEGER,
  lectures: Sequelize.INTEGER,
  num_hours: Sequelize.INTEGER,
  full_price: Sequelize.INTEGER,
  disc_price: Sequelize.INTEGER,
  photo_url: Sequelize.STRING(255),
}, {
  timestamps: false,
  underscored: true,
});

const Join = sequelize.define('joins', {
  course_id: Sequelize.INTEGER,
  instructor_id: Sequelize.INTEGER,
}, {
  timestamps: false,
  underscored: true,
});

Join.belongsTo(Instructors, { foreignKey: 'instructor_id' });
Join.belongsTo(Courses, { foreignKey: 'course_id' });

module.exports = {
  Instructors, Courses, Join, sequelize,
};

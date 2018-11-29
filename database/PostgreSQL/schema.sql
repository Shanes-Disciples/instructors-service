DROP DATABASE udemy;

CREATE DATABASE udemy;

\c udemy;

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  course_rating DECIMAL(2, 1) NOT NULL,
  reviews INT NOT NULL,
  lectures INT NOT NULL,
  num_hours INT NOT NULL,
  full_price INT NOT NULL,
  disc_price INT NOT NULL,
  photo_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS instructors (
  id SERIAL PRIMARY KEY,
  inst_name VARCHAR(255) NOT NULL,
  rating DECIMAL(2, 1) NOT NULL,
  reviews INT NOT NULL,
  students INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  blurb VARCHAR(255) NOT NULL,
  courses INT NOT NULL,
  photo_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS joins (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(id),
  instructor_id INTEGER NOT NULL REFERENCES instructors(id)
);


\COPY courses (course_name, course_rating, reviews, lectures, num_hours, full_price, disc_price, photo_url) FROM './courseData.tsv' DELIMITER E'\t';
\COPY instructors (inst_name, rating, reviews, students, title, blurb, courses, photo_url) FROM './instructorData.tsv' DELIMITER E'\t';
\COPY joins (course_id, instructor_id) FROM './joinData.tsv' DELIMITER E'\t';



-- postgres -D /usr/local/var/postgres (to start)
-- psql postgres <database/PostgreSQL/schema.sql
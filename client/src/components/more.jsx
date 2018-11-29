import React from 'react';
import PropTypes from 'prop-types';
import Course from './course.jsx';
import styles from '../../dist/styles/more.css';

const More = props => (
  <div className={styles.instructorCoursesContainer}>
    {props.info.courseInfo.length
      ? <div className={styles.instructorCoursesHeader}>
        More Courses by {props.info.inst_name}</div>
      : null}
    {props.info.courseInfo
      .slice(0, 3)
      .map((course, i) => < Course key={i} cInfo={course} instInfo={props.info.instInfo} />)
    }
  </div>
);

export default More;

More.propTypes = {
  info: PropTypes.shape({
    instInfo: PropTypes.shape({
      photo_url: PropTypes.string,
      rating: PropTypes.number,
      reviews: PropTypes.number,
      students: PropTypes.number,
      courses: PropTypes.number,
      name: PropTypes.string,
      title: PropTypes.string,
      blurb: PropTypes.string,
    }),
    courseInfo: PropTypes.arrayOf(PropTypes.shape({
      photo_url: PropTypes.string,
      lectures: PropTypes.number,
      num_hours: PropTypes.number,
      course_name: PropTypes.string,
      course_rating: PropTypes.string,
      reviews: PropTypes.number,
      disc_price: PropTypes.number,
      full_price: PropTypes.number,
    })),
  }),
};

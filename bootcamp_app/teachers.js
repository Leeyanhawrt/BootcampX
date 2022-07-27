let processArgs = process.argv.slice(2);

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
})

pool.query(`
SELECT DISTINCT teachers.name AS name, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON (assistance_requests.teacher_id = teachers.id)
  JOIN students ON (students.id = assistance_requests.student_id)
  JOIN cohorts ON (cohorts.id = students.cohort_id)
  WHERE cohorts.name = '${processArgs[0]}'
  ORDER BY teachers.name
`)
  .then(data => {
    data.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${teacher.name}`)
    })
  })
  .catch(err => {
    console.log(err.stack)
  })
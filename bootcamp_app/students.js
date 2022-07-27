const processArgs = process.argv.slice(2);

const { Pool } = require('pg')

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
})

pool.query(`
SELECT students.id AS students_id, students.name AS students_name, cohorts.name AS cohorts_name
FROM STUDENTS 
JOIN cohorts ON (cohorts.id = students.cohort_id)
WHERE cohorts.name LIKE $1
LIMIT $2;
`, [`%${processArgs[0]}%`, processArgs[1]])
  .then(data => {
    data.rows.forEach(user => {
      console.log(`${user.students_name} has an id of ${user.students_id} and was in the ${user.cohorts_name} cohort`)
    })
  })
  .catch(err => {
    console.log(err.stack)
  })
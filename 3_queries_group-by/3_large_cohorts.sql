SELECT cohorts.name, COUNT(students.*) 
FROM cohorts
JOIN students ON (cohorts.id = students.cohort_id)
GROUP BY cohorts.name
HAVING COUNT(students.*) >= 18
ORDER BY COUNT(students.*);
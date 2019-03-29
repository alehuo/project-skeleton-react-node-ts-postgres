-- getTasks
SELECT * 
FROM todoapp.task;

-- createTask
INSERT INTO todoapp.task ("id", "name", "sortindex", "owner")
VALUES
(nextval('todoapp.task_id_seq'), $1::text, $2::integer, $3::integer)
RETURNING "id", "name", "sortindex", "owner";

-- deleteTask
DELETE
FROM todoapp.task
WHERE id=$1
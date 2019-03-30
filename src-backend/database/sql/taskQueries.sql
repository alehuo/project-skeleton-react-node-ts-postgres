-- getTasks
SELECT "id", "name", "sortindex", "owner", "status"
FROM todoapp.task;

-- createTask
INSERT INTO todoapp.task ("id", "name", "sortindex", "owner", "status")
VALUES
(nextval('todoapp.task_id_seq'), $1::text, $2::integer, $3::integer, $4::text)
RETURNING "id", "name", "sortindex", "owner", "status";

-- deleteTask
DELETE
FROM todoapp.task
WHERE id=$1;

-- updateTaskStatus
UPDATE todoapp.task
SET status = $2::text
WHERE id=$1;
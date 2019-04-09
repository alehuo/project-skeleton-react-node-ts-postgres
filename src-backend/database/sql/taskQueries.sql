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
WHERE id=$1
RETURNING "id", "name", "sortindex", "owner", "status";

-- shiftTasksUp
UPDATE todoapp.task
SET sortindex = sortindex - 1
WHERE sortindex > $1;

-- updateTaskStatus
UPDATE todoapp.task
SET status = $2::text
WHERE id=$1;

-- moveTaskUpPart1
WITH originalPosition AS (
  SELECT sortindex
  FROM todoapp.task
  WHERE id=$1
  LIMIT 1
)
UPDATE todoapp.task
  SET sortindex = sortindex + 1
  WHERE sortindex IN (SELECT (sortindex - 1) FROM originalPosition);

-- moveTaskUpPart2
UPDATE todoapp.task
  SET sortindex = sortindex - 1
  WHERE id=$1;

-- moveTaskDownPart1
WITH originalPosition AS (
  SELECT sortindex
  FROM todoapp.task
  WHERE id=$1
  LIMIT 1
)
UPDATE todoapp.task
  SET sortindex = sortindex - 1
  WHERE sortindex IN (SELECT (sortindex + 1) FROM originalPosition);

-- moveTaskDownPart2
UPDATE todoapp.task
  SET sortindex = sortindex + 1
  WHERE id=$1;
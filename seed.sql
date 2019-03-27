-- Truncate tables
TRUNCATE todoapp.task CASCADE;

--Task
INSERT INTO todoapp.task ("id", "name", "sortindex", "owner")
VALUES 
(101, 'Code task 1', 1, 123),
(102, 'Code task 2', 2, 123),
(103, 'Code task 3', 4, 123),
(104, 'Code task 4', 3, 123);
#!/bin/bash

echo "INFO: Reseting schema"
psql "postgresql://todoapplicationdev:passwd@localhost:2345/tododbdev" --file src-database/ddl.sql

echo "INFO: Seeding db"
psql "postgresql://todoapplicationdev:passwd@localhost:2345/tododbdev" --file src-database/seed.sql

echo "INFO: Showing table"
psql "postgresql://todoapplicationdev:passwd@localhost:2345/tododbdev" -c "SELECT * FROM todoapp.task"

echo "INFO: Done!"
-- postgres parameters

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';
SET default_with_oids = false;

-- CREATE SCHEMA

DROP SCHEMA todoapp CASCADE;
CREATE SCHEMA todoapp;

-- CREATE TABLES

-- Task

CREATE TABLE todoapp.task (
    id integer NOT NULL,
    name character varying NOT NULL,
    sortindex integer NOT NULL,
    owner integer NOT NULL
);

ALTER TABLE todoapp.task OWNER TO todoapplicationdev;

CREATE SEQUENCE todoapp.task_id_seq
    START WITH 100
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE todoapp.task_id_seq OWNER TO todoapplicationdev;

ALTER SEQUENCE todoapp.task_id_seq OWNED BY todoapp.task.id;
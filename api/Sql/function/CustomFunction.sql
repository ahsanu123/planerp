CREATE OR REPLACE FUNCTION UpsertProjects(projects int) 
RETURNS project
LANGUAGE SQL
AS $$
SELECT * FROM project;
 -- SELECT $1, CAST($1 AS text) || ' is text'
$$;


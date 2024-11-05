FROM postgres:alpine3.20
COPY initdb.sql /docker-entrypoint-initdb.d/


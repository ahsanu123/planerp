FROM alpine:3.20

# ref: https://github.com/alpine-docker/multi-arch-docker-images/blob/master/psql/Dockerfile
RUN apk add --update --no-cache postgresql-client

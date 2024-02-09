#!/bin/bash

set -e
pg_ctl -D /var/lib/postgresql/data stop
pg_ctl -D /var/lib/postgresql/data start

echo Debug: postgres://"$POSTGRES_USER":"$POSTGRES_PASSWORD"@localhost:5432/"$POSTGRES_DB"
DATABASE_URL=postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB /node_modules/.bin/node-pg-migrate -m api/dist/migrations up

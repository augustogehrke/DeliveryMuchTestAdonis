#!/bin/sh
set -e
if [ "$NODE_ENV" = 'dev' ]; then
  npm install --production=false
  npm start
fi
# We need the following line in order to keep the container running.
while [ 1 -eq 1 ];do sleep 1 ;done

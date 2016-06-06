#!/bin/bash
ls
./redis-3.2.0/src/redis-server redis.conf
cd socket-node
node index

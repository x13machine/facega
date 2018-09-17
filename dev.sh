#!/bin/bash
cd www
    #nodemon --watch src webpack.config.js --ignore src/templates --exec "npm run build" &
    npm run watch &
cd ..

python3 manage.py runserver
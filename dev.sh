#!/bin/bash
cd www
npm run watch &
cd ..

python3 manage.py runserver
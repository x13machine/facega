#!/bin/bash
cd www
npm run watch &
cd ..

debug=true python3 manage.py runserver 0.0.0.0:8000
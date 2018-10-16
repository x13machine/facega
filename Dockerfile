FROM python:3.6
WORKDIR /
ADD ./requirements.txt /requirements.txt
RUN pip3 install -r requirements.txt
ADD . /
EXPOSE 8000
CMD ["python3", "manage.py", "runserver","0.0.0.0:8000"]
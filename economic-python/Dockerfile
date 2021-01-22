FROM python:3.7-alpine

COPY ./requirements.txt /src/requirements.txt
WORKDIR /src

RUN pip3 install -r requirements.txt

COPY ./src /src

CMD ["tail","-f","/dev/null"]
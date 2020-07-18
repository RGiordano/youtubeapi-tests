FROM python:3

WORKDIR /app

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app

CMD [ "python", "app.py" ]
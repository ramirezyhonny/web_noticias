from flask import Flask
from os import getenv
from sqlalchemy.engine import URL, create_engine

DB_CREDENTIALS = {
    "drivername": getenv("MYSQL_DRIVERNAME"),
    "username": getenv("MYSQL_USERNAME"),
    "password": getenv("MYSQL_PASSWORD"),
    "host": getenv("MYSQL_HOST"),
    "port": getenv("MYSQL_PORT"),
    "database": getenv("MYSQL_DATABASE"),
}

print("DB Credentials:", DB_CREDENTIALS)  # Depuración

try:
    DB_URL = URL.create(**DB_CREDENTIALS)
    ENGINE = create_engine(DB_URL)
except Exception as e:
    print("Error creating engine:", e)  # Depuración
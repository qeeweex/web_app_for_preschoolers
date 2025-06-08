import sqlite3
import hashlib
from users import User


class Database:
    db_path = "database.db"
    schema_path = "schema.sql"
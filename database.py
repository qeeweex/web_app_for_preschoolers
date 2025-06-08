import sqlite3
import hashlib
from users import User


class Database:
    db_path = "database.db"
    schema_path = "schema.sql"

    @staticmethod
    def execute(sql_code: str, params: tuple = ()):
        conn = sqlite3.connect(Database.db_path)
        cursor = conn.cursor()
        if params:
            cursor.execute(sql_code, params)  # Используем execute для параметров
        else:
            cursor.executescript(sql_code)    # executescript для DDL-запросов
        conn.commit()
        conn.close()


    @staticmethod
    def register_user(user_name, email, password):
        
        users = Database.fetchall("SELECT * FROM users WHERE user_name = ? OR email = ?", [user_name, email])
        
        print(users)

        if users:
            return False
        
        password_hash = hashlib.md5(password.encode()).hexdigest()
        
        Database.execute("INSERT INTO users (user_name, email, password_hash) "
                          "VALUES(?, ?, ?)",
                        [user_name, email, password_hash])

    @staticmethod
    def fetchall(sql_code: str, params: tuple = ()):
        conn = sqlite3.connect(Database.db_path)
        
        cursor = conn.cursor()
        cursor.execute(sql_code, params)

        return cursor.fetchall()
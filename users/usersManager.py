from database import db_connection


@db_connection.connection_handler
def get_all_usernames(cursor):
    sql_string = """
                SELECT username
                FROM users"""
    cursor.execute(sql_string)
    usernames = cursor.fetchall()
    return usernames


@db_connection.connection_handler
def add_user_to_db(cursor, username, hashed_password):
    sql_string = """
                INSERT INTO users (username, password)
                VALUES (%(username)s, %(hashed_password)s)
                """
    cursor.execute(sql_string, {'username': username,
                                'password': hashed_password})

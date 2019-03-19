from users import usersManager
import bcrypt


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


def are_passwords_equal(first_password, second_password):
    if first_password == second_password:
        return True
    else:
        return False


def register_user(username, password):
    username_in_db = check_if_username_in_db(username)

    if username_in_db:
        return "Username occupied!"
    else:
        hashed_password = hash_password(password)
        usersManager.add_user_to_db(username, hashed_password)
        return "Successful registration!"


def check_if_username_in_db(username):
    all_usernames = usersManager.get_all_usernames()

    for data in all_usernames:
        if data['username'] == username:
            return True
        else:
            return False

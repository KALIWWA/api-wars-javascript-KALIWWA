import os
from users import usersLogic
from flask import Flask, render_template, send_from_directory, session, request, url_for, flash, redirect, jsonify

app = Flask(__name__)
app.secret_key = '123'


@app.route('/')
def route_index():
    return render_template('index.html')


@app.route('/registration', methods=['POST'])
def route_registration():
    if 'username' not in session:
        registration_data = request.get_json()
        username = registration_data['username']
        password1 = registration_data['password']
        password2 = registration_data['passwordConfirm']
        passwords_equal = usersLogic.are_passwords_equal(password1, password2)

        if passwords_equal:
            status = usersLogic.register_user(username, password1)
            return jsonify({'state': status})
        else:
            return jsonify({'state': 'notEqualPasswords'})
    else:
        return jsonify({'state': 'logged'})


@app.route('/login', methods=['POST'])
def route_login():
    if 'username' not in session:
        login_data = request.get_json()
        username = login_data['username']
        password = login_data['password']
        is_logged = usersLogic.verify_user_data(username, password)
        if is_logged:
            return jsonify({'state': 'success'})
        else:
            return jsonify({'state': 'fail'})
    else:
        return jsonify({'state': 'logged'})


@app.route('/logout', methods=['POST'])
def route_logout():
    session.pop('username', None)
    if 'username' not in session:
        return jsonify({'state': 'success'})
    else:
        return jsonify({'state': 'fail'})



@app.route('/favicon.ico')
def route_favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'stormTrooper.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.run(debug=True,
            port=8000)

import os
from users import usersLogic
from flask import Flask, render_template, send_from_directory, session, request, url_for, flash, redirect

app = Flask(__name__)


@app.route('/')
def route_index():
    return render_template('index.html')


@app.route('/user_service', methods=['GET', 'POST'])
def route_registration():
    if 'login' not in session:
        if request.method == 'GET':
            registration = True
            return render_template('userService.html',
                                   login=False,
                                   registration=registration,
                                   form_url=url_for('route_registration'))
        elif request.method == 'POST':
            username = request.form['username']
            password1 = request.form['password1']
            password2 = request.form['password2']
            passwords_equal = usersLogic.are_passwords_equal(password1, password2)

            if passwords_equal:
                status = usersLogic.register_user(username, password1)
                flash(status)
                return redirect('/')
            else:
                return render_template('userService.html',
                                       error_message='Passwords are not the same')
    else:
        flash('You are already with us')
        return redirect('/')


@app.route('/favicon.ico')
def route_favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'stormTrooper.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.run(
        debug=True,
        port=8000
    )

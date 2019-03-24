import os
from users import usersLogic
from flask import Flask, render_template, send_from_directory, session, request, url_for, flash, redirect

app = Flask(__name__)
app.secret_key = '123'


@app.route('/')
def route_index():
    return render_template('index.html')


@app.route('/registration', methods=['GET', 'POST'])
def route_registration():
    if 'username' not in session:
        if request.method == 'GET':
            registration = True
            return render_template('userService.html',
                                   registration=registration,
                                   form_url=url_for('route_registration'))
        elif request.method == 'POST':
            username = request.form.get('username')
            password1 = request.form.get('password1')
            password2 = request.form.get('password2')
            passwords_equal = usersLogic.are_passwords_equal(password1, password2)

            if passwords_equal:
                status = usersLogic.register_user(username, password1)
                flash(status)
                return redirect('/')
            else:
                return render_template('userService.html',
                                       registration=True,
                                       error_message='Passwords are not the same')
    else:
        flash('You are already with us')
        return redirect('/')


@app.route('/login', methods=['GET', 'POST'])
def route_login():
    if 'username' not in session:
        if request.method == 'GET':
            registration = False
            return render_template('userService.html',
                                   login=False,
                                   registration=registration,
                                   form_url=url_for('route_login'))
        elif request.method == 'POST':
            username = request.form.get('username')
            password = request.form.get('password1')
            is_logged = usersLogic.verify_user_data(username, password)
            if is_logged:
                session['username'] = username
                render_template('index.html',
                                login=True,
                                session=session,
                                username=session['username'])
                return redirect('/')
            else:
                flash(f'Wrong login or password.')
                return redirect('/login')
    else:
        flash('You are already with us')
        return redirect('/')


@app.route('/logout')
def route_logout():
    session.pop('username', None)
    flash('You safely logged out')
    return redirect('/')


@app.route('/favicon.ico')
def route_favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'stormTrooper.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.run()

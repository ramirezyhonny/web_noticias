from flask import render_template, Blueprint
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
home_bp=Blueprint('home_bp',__name__)

@home_bp.route('/')
def home():
    return render_template('home.html')
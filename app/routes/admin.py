from flask import Blueprint, render_template, jsonify
from database.session import create_local_session
from models.user import User

admin_bp=Blueprint('admin_bp', __name__)



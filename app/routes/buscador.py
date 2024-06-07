from flask import Blueprint, jsonify, render_template,request
from database.session import create_local_session
from models.noticia import Noticia

buscador_bp=Blueprint('buscador_bp', __name__)

#@buscador_bp.route('/buscador', methods=['GET','POST'])

#def buscador():

from flask import Blueprint, jsonify
from models.noticia import Noticia
from database.session import create_local_session
from sqlalchemy import distinct

listadoCategorias_bp=Blueprint('listadoCategorias_bp', __name__)
@listadoCategorias_bp.route('/listadoCategorias', methods=['GET'])
def listadoCategorias():
    with create_local_session() as db:
        categorias_query = db.query(distinct(Noticia.categoria)).all()
        unicas_categorias=[categoria[0] for categoria in categorias_query]
        return jsonify(unicas_categorias)
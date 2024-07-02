from flask import Blueprint, render_template, jsonify, redirect, url_for
from database.session import create_local_session
from models.user import User
from models.noticia import Noticia
from functools import wraps
from flask_login import current_user, login_required

admin_bp=Blueprint('admin_bp', __name__)

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or current_user.role != "Admin":
            return redirect(url_for('auth_bp.login'))
        return f(*args, **kwargs)
    return decorated_function

@admin_bp.route('/admin')
@login_required
@admin_required
#Funcion para renderizar la vista admin
def panel_admin():
    return render_template('panel_admin.html')

# <<---OBTENcION DE LOS DATOS-->
#Obtener usuarios con sus datos
@admin_bp.route('/admin/users', methods=['GET'])
@login_required
@admin_required
def obtener_usuarios():
    with create_local_session() as db:
        usuarios = db.query(User).all()
        lista_usuarios = [{'id':user.id, 'username':user.username, 'email':user.email, 'role':user.role} for user in usuarios]
        return jsonify(lista_usuarios)
#Obtener las noticias con sus datos
@admin_bp.route('/admin/noticias', methods=['GET'])
@login_required
@admin_required
def obtener_noticias():
    with create_local_session() as db:
        noticias=db.query(Noticia).all()
        lista_noticias= [{'id':noticia.id, 'titulo':noticia.titulo, 'autor_id':noticia.autor_id, 'descripcion':noticia.descripcion, 'categoria':noticia.categoria, 'fecha_publicacion':noticia.fecha_publicacion} for noticia in noticias]
        return jsonify(lista_noticias)
    
#Contador de usuarios y noticias
@admin_bp.route('/admin/contador', methods=['GET'])
def contador():
    with create_local_session() as db:
        usuario_contador=db.query(User).count()
        noticia_contador=db.query(Noticia).count()
        return jsonify({'usuario_contador':usuario_contador, 'noticia_contador':noticia_contador})
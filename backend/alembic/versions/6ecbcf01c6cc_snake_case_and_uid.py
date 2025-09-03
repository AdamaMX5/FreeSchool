"""migrate_to_uid_and_snake_case

Revision ID: migrate_to_uid_and_snake_case
Revises: 99e2d930d3cb
Create Date: 2024-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
import secrets
import string
from datetime import datetime

# revision identifiers
revision = 'migrate_to_uid_and_snake_case'
down_revision = '99e2d930d3cb'
branch_labels = None
depends_on = None

def generate_uid():
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(8))

def table_has_column(table_name, column_name):
    """Prüft ob eine Tabelle eine bestimmte Spalte hat"""
    connection = op.get_bind()
    result = connection.execute(
        sa.text("""
            SELECT EXISTS (
                SELECT 1 FROM information_schema.columns 
                WHERE table_name = :table AND column_name = :column
            )
        """),
        {'table': table_name, 'column': column_name}
    )
    return result.scalar()

def upgrade():
    # Temporäre Tabelle für ID-Mappings
    op.create_table(
        'id_mapping',
        sa.Column('table_name', sa.String(50), primary_key=True),
        sa.Column('old_id', sa.Integer(), primary_key=True),
        sa.Column('new_uid', sa.String(8)),
        sa.Index('idx_id_mapping', 'table_name', 'old_id')
    )

    # 1. UID Spalten zu allen Tabellen hinzufügen
    tables = [
        'users', 'role', 'profile', 'category',
        'lesson', 'content', 'teacher'
    ]

    for table in tables:
        op.add_column(table, sa.Column('uid', sa.String(8), nullable=True))
        op.add_column(table, sa.Column('deleted_at', sa.DateTime(), nullable=True))

    # 2. Snake Case Spalten umbenennen und hinzufügen (nur wenn sie existieren)
    if table_has_column('category', 'backgroundLink'):
        op.alter_column('category', 'backgroundLink', new_column_name='background_link')

    if table_has_column('lesson', 'order'):
        op.alter_column('lesson', 'order', new_column_name='display_order')

    if table_has_column('users', 'passwortResetToken'):
        op.alter_column('users', 'passwortResetToken', new_column_name='password_reset_token')

    if table_has_column('users', 'emailVerifyToken'):
        op.alter_column('users', 'emailVerifyToken', new_column_name='email_verify_token')

    if table_has_column('users', 'emailVerify'):
        op.alter_column('users', 'emailVerify', new_column_name='email_verify')

    if table_has_column('users', 'lastLogin'):
        op.alter_column('users', 'lastLogin', new_column_name='last_login')

    if table_has_column('users', 'lastEditor'):
        op.alter_column('users', 'lastEditor', new_column_name='last_editor')

    if table_has_column('users', 'passwordVerify'):
        op.alter_column('users', 'passwordVerify', new_column_name='password_verify')

    if table_has_column('profile', 'lasteditor'):
        op.alter_column('profile', 'lasteditor', new_column_name='last_editor')

    # 3. UIDs für alle bestehenden Einträge generieren
    connection = op.get_bind()

    # Role Tabelle
    result = connection.execute(sa.text("SELECT id FROM role"))
    roles = result.fetchall()
    for role_id in roles:
        uid = generate_uid()
        connection.execute(
            sa.text("UPDATE role SET uid = :uid WHERE id = :id"),
            {'uid': uid, 'id': role_id[0]}
        )
        connection.execute(
            sa.text("INSERT INTO id_mapping (table_name, old_id, new_uid) VALUES ('role', :id, :uid)"),
            {'id': role_id[0], 'uid': uid}
        )

    # Users Tabelle
    result = connection.execute(sa.text("SELECT id FROM users"))
    users = result.fetchall()
    for user_id in users:
        uid = generate_uid()
        connection.execute(
            sa.text("UPDATE users SET uid = :uid WHERE id = :id"),
            {'uid': uid, 'id': user_id[0]}
        )
        connection.execute(
            sa.text("INSERT INTO id_mapping (table_name, old_id, new_uid) VALUES ('users', :id, :uid)"),
            {'id': user_id[0], 'uid': uid}
        )

    # Category Tabelle
    result = connection.execute(sa.text("SELECT id FROM category"))
    categories = result.fetchall()
    for category_id in categories:
        uid = generate_uid()
        connection.execute(
            sa.text("UPDATE category SET uid = :uid WHERE id = :id"),
            {'uid': uid, 'id': category_id[0]}
        )
        connection.execute(
            sa.text("INSERT INTO id_mapping (table_name, old_id, new_uid) VALUES ('category', :id, :uid)"),
            {'id': category_id[0], 'uid': uid}
        )

    # Teacher Tabelle
    result = connection.execute(sa.text("SELECT id FROM teacher"))
    teachers = result.fetchall()
    for teacher_id in teachers:
        uid = generate_uid()
        connection.execute(
            sa.text("UPDATE teacher SET uid = :uid WHERE id = :id"),
            {'uid': uid, 'id': teacher_id[0]}
        )
        connection.execute(
            sa.text("INSERT INTO id_mapping (table_name, old_id, new_uid) VALUES ('teacher', :id, :uid)"),
            {'id': teacher_id[0], 'uid': uid}
        )

    # Lesson Tabelle
    result = connection.execute(sa.text("SELECT id FROM lesson"))
    lessons = result.fetchall()
    for lesson_id in lessons:
        uid = generate_uid()
        connection.execute(
            sa.text("UPDATE lesson SET uid = :uid WHERE id = :id"),
            {'uid': uid, 'id': lesson_id[0]}
        )
        connection.execute(
            sa.text("INSERT INTO id_mapping (table_name, old_id, new_uid) VALUES ('lesson', :id, :uid)"),
            {'id': lesson_id[0], 'uid': uid}
        )

    # Content Tabelle
    result = connection.execute(sa.text("SELECT id FROM content"))
    contents = result.fetchall()
    for content_id in contents:
        uid = generate_uid()
        connection.execute(
            sa.text("UPDATE content SET uid = :uid WHERE id = :id"),
            {'uid': uid, 'id': content_id[0]}
        )
        connection.execute(
            sa.text("INSERT INTO id_mapping (table_name, old_id, new_uid) VALUES ('content', :id, :uid)"),
            {'id': content_id[0], 'uid': uid}
        )

    # 4. Neue UID Spalten für Referenztabellen
    op.add_column('categorycategory', sa.Column('parent_uid', sa.String(8), nullable=True))
    op.add_column('categorycategory', sa.Column('child_uid', sa.String(8), nullable=True))
    op.add_column('userrolelink', sa.Column('user_uid', sa.String(8), nullable=True))
    op.add_column('userrolelink', sa.Column('role_uid', sa.String(8), nullable=True))
    op.add_column('userlessonlink', sa.Column('user_uid', sa.String(8), nullable=True))
    op.add_column('userlessonlink', sa.Column('lesson_uid', sa.String(8), nullable=True))
    op.add_column('profile', sa.Column('user_uid', sa.String(8), nullable=True))
    op.add_column('content', sa.Column('lesson_uid', sa.String(8), nullable=True))
    op.add_column('content', sa.Column('teacher_uid', sa.String(8), nullable=True))
    op.add_column('lesson', sa.Column('category_uid', sa.String(8), nullable=True))

    # 5. Foreign Keys aktualisieren
    # CategoryCategory
    connection.execute(sa.text("""
        UPDATE categorycategory cc 
        SET parent_uid = m1.new_uid, child_uid = m2.new_uid
        FROM id_mapping m1, id_mapping m2
        WHERE cc.parent_id = m1.old_id AND m1.table_name = 'category'
        AND cc.child_id = m2.old_id AND m2.table_name = 'category'
    """))

    # UserRoleLink
    connection.execute(sa.text("""
        UPDATE userrolelink url 
        SET user_uid = m1.new_uid, role_uid = m2.new_uid
        FROM id_mapping m1, id_mapping m2
        WHERE url.user_id = m1.old_id AND m1.table_name = 'users'
        AND url.role_id = m2.old_id AND m2.table_name = 'role'
    """))

    # UserLessonLink
    connection.execute(sa.text("""
        UPDATE userlessonlink ull 
        SET user_uid = m1.new_uid, lesson_uid = m2.new_uid
        FROM id_mapping m1, id_mapping m2
        WHERE ull.user_id = m1.old_id AND m1.table_name = 'users'
        AND ull.lesson_id = m2.old_id AND m2.table_name = 'lesson'
    """))

    # Profile
    connection.execute(sa.text("""
        UPDATE profile p 
        SET user_uid = m.new_uid
        FROM id_mapping m
        WHERE p.user_id = m.old_id AND m.table_name = 'users'
    """))

    # Content
    connection.execute(sa.text("""
        UPDATE content c 
        SET lesson_uid = m1.new_uid, teacher_uid = m2.new_uid
        FROM id_mapping m1, id_mapping m2
        WHERE c.lesson_id = m1.old_id AND m1.table_name = 'lesson'
        AND c.teacher_id = m2.old_id AND m2.table_name = 'teacher'
    """))

    # Lesson
    connection.execute(sa.text("""
        UPDATE lesson l 
        SET category_uid = m.new_uid
        FROM id_mapping m
        WHERE l.category_id = m.old_id AND m.table_name = 'category'
    """))

    # 6. Alte Spalten entfernen (nur wenn sie existieren)
    tables_with_is_deleted = ['users', 'category', 'lesson', 'content', 'teacher']
    for table in tables_with_is_deleted:
        if table_has_column(table, 'is_deleted'):
            op.drop_column(table, 'is_deleted')

    # Alte Foreign Key Spalten entfernen
    if table_has_column('categorycategory', 'parent_id'):
        op.drop_column('categorycategory', 'parent_id')
    if table_has_column('categorycategory', 'child_id'):
        op.drop_column('categorycategory', 'child_id')
    if table_has_column('userrolelink', 'user_id'):
        op.drop_column('userrolelink', 'user_id')
    if table_has_column('userrolelink', 'role_id'):
        op.drop_column('userrolelink', 'role_id')
    if table_has_column('userlessonlink', 'user_id'):
        op.drop_column('userlessonlink', 'user_id')
    if table_has_column('userlessonlink', 'lesson_id'):
        op.drop_column('userlessonlink', 'lesson_id')
    if table_has_column('profile', 'user_id'):
        op.drop_column('profile', 'user_id')
    if table_has_column('content', 'lesson_id'):
        op.drop_column('content', 'lesson_id')
    if table_has_column('content', 'teacher_id'):
        op.drop_column('content', 'teacher_id')
    if table_has_column('lesson', 'category_id'):
        op.drop_column('lesson', 'category_id')

    # 7. UID Spalten als NOT NULL setzen
    for table in tables:
        op.alter_column(table, 'uid', nullable=False)
        op.create_unique_constraint(f'uq_{table}_uid', table, ['uid'])

    op.alter_column('categorycategory', 'parent_uid', nullable=False)
    op.alter_column('categorycategory', 'child_uid', nullable=False)
    op.alter_column('userrolelink', 'user_uid', nullable=False)
    op.alter_column('userrolelink', 'role_uid', nullable=False)
    op.alter_column('userlessonlink', 'user_uid', nullable=False)
    op.alter_column('userlessonlink', 'lesson_uid', nullable=False)
    op.alter_column('profile', 'user_uid', nullable=False)
    op.alter_column('content', 'lesson_uid', nullable=False)
    op.alter_column('content', 'teacher_uid', nullable=False)
    op.alter_column('lesson', 'category_uid', nullable=False)

    # 8. Temporäre Tabelle löschen
    op.drop_table('id_mapping')

def downgrade():
    # Hier würde das Downgrade Script stehen
    pass

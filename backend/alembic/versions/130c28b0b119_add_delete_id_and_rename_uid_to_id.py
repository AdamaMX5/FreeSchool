"""Add delete id and rename uid to id

Revision ID: 130c28b0b119
Revises: 767e242eb06f
Create Date: 2025-10-17 18:52:35.549911

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '130c28b0b119'
down_revision: Union[str, None] = '767e242eb06f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    connection = op.get_bind()

    print("Starting migration: Converting UIDs to IDs...")

    # 1. ZUERST ALLE FREMDSCHLÜSSEL-CONSTRAINTS ENTFERNEN
    print("Dropping ALL foreign key constraints...")

    # CategoryCategory Constraints
    op.drop_constraint('categorycategory_parent_fk', 'categorycategory', type_='foreignkey')
    op.drop_constraint('categorycategory_child_fk', 'categorycategory', type_='foreignkey')
    op.drop_constraint('fk_categorycategory_parent_uid', 'categorycategory', type_='foreignkey')
    op.drop_constraint('fk_categorycategory_child_uid', 'categorycategory', type_='foreignkey')

    # Lesson Constraints
    op.drop_constraint('lesson_category_fk', 'lesson', type_='foreignkey')
    op.drop_constraint('fk_lesson_category_uid', 'lesson', type_='foreignkey')

    # Content Constraints
    op.drop_constraint('content_lesson_fk', 'content', type_='foreignkey')
    op.drop_constraint('content_teacher_fk', 'content', type_='foreignkey')
    op.drop_constraint('fk_content_teacher_uid', 'content', type_='foreignkey')
    op.drop_constraint('fk_content_lesson_uid', 'content', type_='foreignkey')

    # Profile Constraints
    op.drop_constraint('profile_user_fk', 'profile', type_='foreignkey')
    op.drop_constraint('fk_profile_user_uid', 'profile', type_='foreignkey')

    # UserLessonLink Constraints
    op.drop_constraint('userlessonlink_user_fk', 'userlessonlink', type_='foreignkey')
    op.drop_constraint('userlessonlink_lesson_fk', 'userlessonlink', type_='foreignkey')
    op.drop_constraint('fk_userlessonlink_user_uid', 'userlessonlink', type_='foreignkey')
    op.drop_constraint('fk_userlessonlink_lesson_uid', 'userlessonlink', type_='foreignkey')

    # UserRoleLink Constraints
    op.drop_constraint('userrolelink_user_fk', 'userrolelink', type_='foreignkey')
    op.drop_constraint('userrolelink_role_fk', 'userrolelink', type_='foreignkey')
    op.drop_constraint('fk_userrolelink_user_uid', 'userrolelink', type_='foreignkey')
    op.drop_constraint('fk_userrolelink_role_uid', 'userrolelink', type_='foreignkey')

    # 2. FREMDSCHLÜSSEL-SPALTEN AUF STRING UMWANDELN
    print("Converting foreign key columns to string type...")
    op.alter_column('categorycategory', 'parent_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=False)
    op.alter_column('categorycategory', 'child_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=False)
    op.alter_column('content', 'lesson_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=False)
    op.alter_column('content', 'teacher_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=True)
    op.alter_column('lesson', 'category_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=False)
    op.alter_column('profile', 'user_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=False)
    op.alter_column('userlessonlink', 'user_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=False)
    op.alter_column('userlessonlink', 'lesson_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=False)
    op.alter_column('userrolelink', 'user_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=False)
    op.alter_column('userrolelink', 'role_id',
                    existing_type=sa.INTEGER(),
                    type_=sqlmodel.sql.sqltypes.AutoString(),
                    existing_nullable=False)

    # 3. FREMDSCHLÜSSEL-WERTE AUF DIE UID-WERTE AKTUALISIEREN
    print("Updating foreign key values to match UID values...")

    # CategoryCategory - parent_id und child_id aktualisieren
    connection.execute(sa.text("""
        UPDATE categorycategory 
        SET parent_id = (SELECT uid FROM category WHERE id = categorycategory.parent_id::integer),
            child_id = (SELECT uid FROM category WHERE id = categorycategory.child_id::integer)
    """))

    # Content - lesson_id und teacher_id aktualisieren
    connection.execute(sa.text("""
        UPDATE content 
        SET lesson_id = (SELECT uid FROM lesson WHERE id = content.lesson_id::integer),
            teacher_id = (SELECT uid FROM teacher WHERE id = content.teacher_id::integer)
        WHERE teacher_id IS NOT NULL
    """))

    # Content (nur lesson_id für Einträge ohne teacher)
    connection.execute(sa.text("""
        UPDATE content 
        SET lesson_id = (SELECT uid FROM lesson WHERE id = content.lesson_id::integer)
        WHERE teacher_id IS NULL
    """))

    # Lesson - category_id aktualisieren
    connection.execute(sa.text("""
        UPDATE lesson 
        SET category_id = (SELECT uid FROM category WHERE id = lesson.category_id::integer)
    """))

    # Profile - user_id aktualisieren
    connection.execute(sa.text("""
        UPDATE profile 
        SET user_id = (SELECT uid FROM users WHERE id = profile.user_id::integer)
    """))

    # UserLessonLink - user_id und lesson_id aktualisieren
    connection.execute(sa.text("""
        UPDATE userlessonlink 
        SET user_id = (SELECT uid FROM users WHERE id = userlessonlink.user_id::integer),
            lesson_id = (SELECT uid FROM lesson WHERE id = userlessonlink.lesson_id::integer)
    """))

    # UserRoleLink - user_id und role_id aktualisieren
    connection.execute(sa.text("""
        UPDATE userrolelink 
        SET user_id = (SELECT uid FROM users WHERE id = userrolelink.user_id::integer),
            role_id = (SELECT uid FROM role WHERE id = userrolelink.role_id::integer)
    """))

    # 4. JETZT DIE ID-SPALTEN DURCH UID ERSETZEN
    print("Replacing ID columns with UID values...")

    # Temporäre Spalten für die UID-Werte erstellen
    op.add_column('category', sa.Column('temp_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('content', sa.Column('temp_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('lesson', sa.Column('temp_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('profile', sa.Column('temp_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('role', sa.Column('temp_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('teacher', sa.Column('temp_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.add_column('users', sa.Column('temp_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True))

    # UID-Werte in temporäre Spalten kopieren
    connection.execute(sa.text("UPDATE category SET temp_id = uid"))
    connection.execute(sa.text("UPDATE content SET temp_id = uid"))
    connection.execute(sa.text("UPDATE lesson SET temp_id = uid"))
    connection.execute(sa.text("UPDATE profile SET temp_id = uid"))
    connection.execute(sa.text("UPDATE role SET temp_id = uid"))
    connection.execute(sa.text("UPDATE teacher SET temp_id = uid"))
    connection.execute(sa.text("UPDATE users SET temp_id = uid"))

    # Alte ID-Spalten löschen
    op.drop_column('category', 'id')
    op.drop_column('content', 'id')
    op.drop_column('lesson', 'id')
    op.drop_column('profile', 'id')
    op.drop_column('role', 'id')
    op.drop_column('teacher', 'id')
    op.drop_column('users', 'id')

    # Temporäre Spalten in ID umbenennen
    op.alter_column('category', 'temp_id', new_column_name='id')
    op.alter_column('content', 'temp_id', new_column_name='id')
    op.alter_column('lesson', 'temp_id', new_column_name='id')
    op.alter_column('profile', 'temp_id', new_column_name='id')
    op.alter_column('role', 'temp_id', new_column_name='id')
    op.alter_column('teacher', 'temp_id', new_column_name='id')
    op.alter_column('users', 'temp_id', new_column_name='id')

    # ID als PRIMARY KEY setzen
    print("Setting ID as primary key...")
    op.create_primary_key('pk_category', 'category', ['id'])
    op.create_primary_key('pk_content', 'content', ['id'])
    op.create_primary_key('pk_lesson', 'lesson', ['id'])
    op.create_primary_key('pk_profile', 'profile', ['id'])
    op.create_primary_key('pk_role', 'role', ['id'])
    op.create_primary_key('pk_teacher', 'teacher', ['id'])
    op.create_primary_key('pk_users', 'users', ['id'])

    # 5. UID-SPALTEN ENTFERNEN
    print("Removing UID columns...")
    op.drop_index('ix_category_uid', table_name='category')
    op.drop_column('category', 'uid')
    op.drop_index('ix_content_uid', table_name='content')
    op.drop_column('content', 'uid')
    op.drop_column('content', 'teacher_uid')
    op.drop_column('content', 'lesson_uid')
    op.drop_index('ix_lesson_uid', table_name='lesson')
    op.drop_column('lesson', 'uid')
    op.drop_column('lesson', 'category_uid')
    op.drop_index('ix_profile_uid', table_name='profile')
    op.drop_column('profile', 'uid')
    op.drop_column('profile', 'user_uid')
    op.drop_index('ix_role_uid', table_name='role')
    op.drop_column('role', 'uid')
    op.drop_index('ix_teacher_uid', table_name='teacher')
    op.drop_column('teacher', 'uid')
    op.drop_column('userlessonlink', 'user_uid')
    op.drop_column('userlessonlink', 'lesson_uid')
    op.drop_column('userrolelink', 'user_uid')
    op.drop_column('userrolelink', 'role_uid')
    op.drop_index('ix_users_uid', table_name='users')
    op.drop_column('users', 'uid')
    op.drop_column('categorycategory', 'child_uid')
    op.drop_column('categorycategory', 'parent_uid')

    # 6. FREMDSCHLÜSSEL-CONSTRAINTS WIEDERHERSTELLEN
    print("Recreating foreign key constraints...")
    op.create_foreign_key('fk_categorycategory_parent_id', 'categorycategory', 'category', ['parent_id'], ['id'])
    op.create_foreign_key('fk_categorycategory_child_id', 'categorycategory', 'category', ['child_id'], ['id'])
    op.create_foreign_key('fk_content_lesson_id', 'content', 'lesson', ['lesson_id'], ['id'])
    op.create_foreign_key('fk_content_teacher_id', 'content', 'teacher', ['teacher_id'], ['id'])
    op.create_foreign_key('fk_lesson_category_id', 'lesson', 'category', ['category_id'], ['id'])
    op.create_foreign_key('fk_profile_user_id', 'profile', 'users', ['user_id'], ['id'])
    op.create_foreign_key('fk_userlessonlink_user_id', 'userlessonlink', 'users', ['user_id'], ['id'])
    op.create_foreign_key('fk_userlessonlink_lesson_id', 'userlessonlink', 'lesson', ['lesson_id'], ['id'])
    op.create_foreign_key('fk_userrolelink_user_id', 'userrolelink', 'users', ['user_id'], ['id'])
    op.create_foreign_key('fk_userrolelink_role_id', 'userrolelink', 'role', ['role_id'], ['id'])

    print("Migration completed successfully!")


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_index('ix_users_uid', 'users', ['uid'], unique=True)
    op.alter_column('users', 'id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False,
               existing_server_default=sa.text("nextval('user_id_seq'::regclass)"))
    op.add_column('userrolelink', sa.Column('role_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('userrolelink', sa.Column('user_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_foreign_key('fk_userrolelink_user_uid', 'userrolelink', 'users', ['user_uid'], ['uid'])
    op.create_foreign_key('fk_userrolelink_role_uid', 'userrolelink', 'role', ['role_uid'], ['uid'])
    op.alter_column('userrolelink', 'role_id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.alter_column('userrolelink', 'user_id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.add_column('userlessonlink', sa.Column('lesson_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('userlessonlink', sa.Column('user_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_foreign_key('fk_userlessonlink_lesson_uid', 'userlessonlink', 'lesson', ['lesson_uid'], ['uid'])
    op.create_foreign_key('fk_userlessonlink_user_uid', 'userlessonlink', 'users', ['user_uid'], ['uid'])
    op.add_column('teacher', sa.Column('uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_index('ix_teacher_uid', 'teacher', ['uid'], unique=True)
    op.alter_column('teacher', 'id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False,
               existing_server_default=sa.text("nextval('teacher_id_seq'::regclass)"))
    op.add_column('role', sa.Column('uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_index('ix_role_uid', 'role', ['uid'], unique=True)
    op.alter_column('role', 'id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.add_column('profile', sa.Column('user_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('profile', sa.Column('uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_foreign_key('fk_profile_user_uid', 'profile', 'users', ['user_uid'], ['uid'])
    op.create_index('ix_profile_uid', 'profile', ['uid'], unique=True)
    op.alter_column('profile', 'user_id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.alter_column('profile', 'id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.add_column('lesson', sa.Column('uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('lesson', sa.Column('category_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_foreign_key('fk_lesson_category_uid', 'lesson', 'category', ['category_uid'], ['uid'])
    op.create_index('ix_lesson_uid', 'lesson', ['uid'], unique=True)
    op.alter_column('lesson', 'category_id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.alter_column('lesson', 'id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.add_column('content', sa.Column('lesson_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('content', sa.Column('uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('content', sa.Column('teacher_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_foreign_key('fk_content_lesson_uid', 'content', 'lesson', ['lesson_uid'], ['uid'])
    op.create_foreign_key('fk_content_teacher_uid', 'content', 'teacher', ['teacher_uid'], ['uid'])
    op.create_index('ix_content_uid', 'content', ['uid'], unique=True)
    op.alter_column('content', 'teacher_id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=True)
    op.alter_column('content', 'lesson_id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.alter_column('content', 'id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.add_column('categorycategory', sa.Column('parent_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('categorycategory', sa.Column('child_uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_foreign_key('fk_categorycategory_child_uid', 'categorycategory', 'category', ['child_uid'], ['uid'])
    op.create_foreign_key('fk_categorycategory_parent_uid', 'categorycategory', 'category', ['parent_uid'], ['uid'])
    op.alter_column('categorycategory', 'child_id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.alter_column('categorycategory', 'parent_id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.add_column('category', sa.Column('uid', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.create_index('ix_category_uid', 'category', ['uid'], unique=True)
    op.alter_column('category', 'id',
               existing_type=sqlmodel.sql.sqltypes.AutoString(),
               type_=sa.INTEGER(),
               existing_nullable=False,
               existing_server_default=sa.text("nextval('category_id_seq'::regclass)"))
    # ### end Alembic commands ###

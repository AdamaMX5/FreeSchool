"""rename table user to users

Revision ID: 99e2d930d3cb
Revises: a6719239fc0e
Create Date: 2025-08-27 19:50:43.595461
"""
from typing import Sequence, Union
from alembic import op

# revision identifiers, used by Alembic.
revision: str = '99e2d930d3cb'
down_revision: Union[str, None] = 'a6719239fc0e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema: rename user → users and fix FKs."""

    # Tabelle umbenennen
    op.rename_table('user', 'users')

    # ForeignKey in profile anpassen
    op.drop_constraint('profile_user_fk', 'profile', type_='foreignkey')
    op.create_foreign_key(
        'profile_user_fk', 'profile', 'users',
        ['user_id'], ['id']
    )

    # ForeignKey in userlessonlink anpassen
    op.drop_constraint('userlessonlink_user_fk', 'userlessonlink', type_='foreignkey')
    op.create_foreign_key(
        'userlessonlink_user_fk', 'userlessonlink', 'users',
        ['user_id'], ['id'], ondelete='CASCADE'
    )

    # ForeignKey in userrolelink anpassen
    op.drop_constraint('userrolelink_user_fk', 'userrolelink', type_='foreignkey')
    op.create_foreign_key(
        'userrolelink_user_fk', 'userrolelink', 'users',
        ['user_id'], ['id']
    )


def downgrade() -> None:
    """Downgrade schema: rename users → user and fix FKs back."""

    # ForeignKeys zurücksetzen
    op.drop_constraint('userrolelink_user_fk', 'userrolelink', type_='foreignkey')
    op.create_foreign_key(
        'userrolelink_user_fk', 'userrolelink', 'user',
        ['user_id'], ['id']
    )

    op.drop_constraint('userlessonlink_user_fk', 'userlessonlink', type_='foreignkey')
    op.create_foreign_key(
        'userlessonlink_user_fk', 'userlessonlink', 'user',
        ['user_id'], ['id'], ondelete='CASCADE'
    )

    op.drop_constraint('profile_user_fk', 'profile', type_='foreignkey')
    op.create_foreign_key(
        'profile_user_fk', 'profile', 'user',
        ['user_id'], ['id']
    )

    # Tabelle zurück benennen
    op.rename_table('users', 'user')
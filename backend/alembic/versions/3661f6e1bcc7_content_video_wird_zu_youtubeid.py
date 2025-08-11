"""Content video wird zu YoutubeId

Revision ID: 3661f6e1bcc7
Revises: 424a105326a0
Create Date: 2025-05-14 11:51:06.219142

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '3661f6e1bcc7'
down_revision: Union[str, None] = '424a105326a0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Schritt 1: Daten von 'video' nach 'youtube_id' kopieren (falls nötig)
    op.alter_column(
        'content',               # Tabellenname
        'video',                 # Alte Spalte
        new_column_name='youtube_id',  # Neuer Name (falls Umbenennung möglich)
        type=sa.String(),  # Neuer Datentyp
        existing_type=sa.String(length=255),
        existing_nullable=False,
    )
    # Falls Umbenennung nicht unterstützt wird (z. B. SQLite):
    # op.execute("ALTER TABLE content RENAME COLUMN video TO youtube_id;")

def downgrade():
    # Rückgängig machen: Spalte wieder umbenennen
    op.alter_column(
        'content',
        'youtube_id',
        new_column_name='video',
        type=sa.String(),  # Ursprünglicher Typ
        existing_nullable=False,
    )
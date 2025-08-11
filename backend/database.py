from sqlmodel import create_engine, SQLModel, Session

# Verbindungsaufbau zur MariaDB-Datenbank
DATABASE_URL = "postgresql+asyncpg://freeschool:sicher123@db:5432/freeschool"

engine = create_engine(DATABASE_URL, echo=True)


# Dependency für DB-Sitzung
def get_db():
    with Session(engine) as session:
        yield session


def create_tables():
    SQLModel.metadata.create_all(engine)
    print("Tables created")
    return True


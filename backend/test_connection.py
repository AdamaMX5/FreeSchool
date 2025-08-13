# test_connection.py
import asyncio
from database import test_connection

async def main():
    print("Starte Datenbank-Verbindungstest...")
    success = await test_connection()
    print("Ergebnis:", "Erfolgreich" if success else "Fehlgeschlagen")

if __name__ == "__main__":
    asyncio.run(main())
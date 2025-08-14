import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from dotenv import load_dotenv
import ssl
import os

# Lade Umgebungsvariablen aus .env
load_dotenv()


class EmailConfig:
    def __init__(self):
        self.SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.strato.de")
        self.SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
        self.SMTP_USERNAME = os.getenv("SMTP_USERNAME", "newsletter@flussmark.de")
        self.SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "$@DwpWKVt77$Yvs")
        self.USE_SSL = os.getenv("USE_SSL", "True") == "True"
        self.SMTPAUTH = os.getenv("SMTPAUTH", "True") == "True"
        self.FROM_EMAIL = os.getenv("FROM_EMAIL", "freeschool@flussmark.de")
        self.FROM_NAME = os.getenv("FROM_NAME", "FreeSchool")
        self.DEFAULT_CHARSET = os.getenv("DEFAULT_CHARSET", "utf-8")
        self.DEFAULT_ENCODING = os.getenv("DEFAULT_ENCODING", "base64")
        self.DISABLE_EMAILS = os.getenv("DISABLE_EMAILS", "False") == "True"


config = EmailConfig()


class EmailService:
    @staticmethod
    def send_email(
            to_email: str,
            subject: str,
            to_name: Optional[str] = None,
            plain_text: Optional[str] = None,
            html_body: Optional[str] = None,
            from_email: Optional[str] = config.FROM_EMAIL,
            from_name: Optional[str] = config.FROM_NAME,
            reply_to: Optional[str] = None,
            reply_to_name: Optional[str] = None,
            charset: Optional[str] = config.DEFAULT_CHARSET,
            encoding: Optional[str] = config.DEFAULT_ENCODING,
            alt_text: Optional[str] = "Diese Nachricht ist in HTML-Format und Ihr E-Mail-Programm kann sie nicht anzeigen. Bitte kontaktieren Sie uns."
    ) -> bool:
        """Sendet eine Email über SMTP mit erweiterten Optionen"""
        if config.DISABLE_EMAILS:
            print(f"[Email simulated] To: {to_email}\nSubject: {subject}\nText: {plain_text}\nHTML: {html_body}")
            return True

        msg = MIMEMultipart()

        # Absender mit Name formatieren, falls angegeben
        if from_name:
            msg["From"] = f'"{from_name}" <{from_email}>'
        else:
            msg["From"] = from_email

        if(to_name):
            msg["To"] = f'"{to_name}" <{to_email}>'
        else:
            msg["To"] = to_email
        msg["Subject"] = subject

        # Reply-To hinzufügen falls angegeben
        if reply_to:
            if reply_to_name:
                msg["Reply-To"] = f'"{reply_to_name}" <{reply_to}>'
            else:
                msg["Reply-To"] = reply_to

        # Text- und HTML-Version anhängen mit korrektem Encoding
        if plain_text:
            text_part = MIMEText(plain_text, "plain", charset)
            text_part.set_charset(charset)
            if encoding:
                text_part.set_param('encoding', encoding)
            msg.attach(text_part)

        if html_body:
            html_part = MIMEText(html_body, "html", charset)
            html_part.set_charset(charset)
            if encoding:
                html_part.set_param('encoding', encoding)
            msg.attach(html_part)

            # Falls nur HTML angegeben ist, aber kein Plain-Text, erstellen wir einen AltBody
            if not plain_text:
                alt_part = MIMEText(alt_text, "plain", charset)
                alt_part.set_charset(charset)
                if encoding:
                    alt_part.set_param('encoding', encoding)
                msg.attach(alt_part)

        try:
            if config.USE_SSL:
                # SSL-Verbindung verwenden
                context = ssl.create_default_context()
                with smtplib.SMTP_SSL(config.SMTP_SERVER, config.SMTP_PORT, context=context) as server:
                    if config.SMTPAUTH:
                        server.login(config.SMTP_USERNAME, config.SMTP_PASSWORD)
                    server.send_message(msg)
            else:
                # Unverschlüsselte oder STARTTLS-Verbindung
                with smtplib.SMTP(config.SMTP_SERVER, config.SMTP_PORT) as server:
                    if config.SMTPAUTH:
                        server.login(config.SMTP_USERNAME, config.SMTP_PASSWORD)
                    server.send_message(msg)
            return True
        except Exception as e:
            print(f"Email send failed: {str(e)}")
            return False
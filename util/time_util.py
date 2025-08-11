import datetime


def timestamp():
    return int(datetime.datetime.now(datetime.timezone.utc).timestamp())
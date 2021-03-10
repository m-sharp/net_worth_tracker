import os

from .base import *

SECRET_KEY = os.environ["DJANGO_SECRET"]
DEBUG = False
ALLOWED_HOSTS = [
    "localhost",
    "172.20.119.57",
    "159.89.40.203",
    "www.poc-net-worth-estimator.xyz",
    "poc-net-worth-estimator.xyz",
]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

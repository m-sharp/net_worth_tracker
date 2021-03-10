import os

if os.environ["PROD"] == "TRUE":
    from .prod import *
else:
    from .dev import *

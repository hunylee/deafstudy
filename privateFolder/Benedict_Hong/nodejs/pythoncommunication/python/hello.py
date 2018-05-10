import os

os.write(3, bytes('{"dt" : "This is a test"}\n', "utf8"))
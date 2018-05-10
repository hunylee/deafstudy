import sys
import threading

def testFunc():
    text = "this is number : "
    print(text)
    sys.stdout.flush()

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

data = "this began life in python"
print(data)
sys.stdout.flush()

set_interval(testFunc, 1)




number = 5
text = "Python"
python_course = True

if number:
    print("Number is defined an truthy")

if text:
    print("Text is defined and truty")

if number != 5:
    print("This will not execute")

if not python_course:
    print("This will also not execute")

if number == 5 and python_course:
    print("This will execute")

if number == 17 or python_course:
    print("This will also execute")

a = 1
b = 2

print("bigger" if a > b else "smaller")
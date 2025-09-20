hello = "hello"
number = "123"
concatted = "some, csv, values"

print(hello.capitalize())
print(hello.replace("e", "a"))
print(hello.isalpha())

print(hello.isdigit())
print(number.isdigit())

print(concatted.split(","))


name = "Jeroen"
machine = 'Glados'

print("Nice to meet you {0}(test subject). I am {1}".format(name, machine))

print(f"Nice to meet you {name}(test subject). I am {machine}")
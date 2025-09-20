# loop for lists
student_names = ["Mark", "Katarina", "Jessica"]
for name in student_names:
    print(f"Student name is {name}")

# basic for loop
x = 0
for index in range(10):
    x += 10
    print(f"The value of X is {x}")

# break and continue in for loops
student_names = ["James", "Katarina", "Jessica", "Mark", "Bort", "Frank Grimes", "Max Power"]
for name in student_names:
    if name == "Mark":
        print(f"Found him! {name}")
        break
    print(f"Currently testing {name}")

for name in student_names:
    if name == "Bort":
        continue
    print(f"Currently testing {name}")

# basic while loop
x = 0
while x < 10:
    print(f"Count is {x}")
    x += 1
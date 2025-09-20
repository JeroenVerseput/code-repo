students = []

def get_students_titlecase():
    students_titlecase = []
    for student in students:
        students_titlecase.append(student["name"].title())
    return students_titlecase


def print_students_titlecase():
    students_titlecase = get_students_titlecase()
    print(students_titlecase)


def add_student(name, student_id=332):
    student = { "name": name, "student_id": student_id }
    students.append(student)


def save_file(student):
    try:
        f = open("students.txt", "a")
        f.write(student + "\n")
        f.close()
    except Exception:
        print("Could not save file")

def read_file():
    try:
        f = open("students.txt", "r")
        for student in f.readlines():
            add_student(student)
        f.close()
    except Exception:
        print("Could not read file")

def add_new_student():
    student_name = input("Enter student name: ")
    student_id = input("Enter Student ID: ")
    add_student(student_name, student_id)
    save_file(student_name)
    print_students_titlecase()

read_file()
print_students_titlecase()

input_student = input("Would you like to add a new student: (Y/N) ")
while input_student == "Y" or input_student == "y":
    add_new_student()
    input_student = input("Would you like to add another new student: (Y/N) ")   
    
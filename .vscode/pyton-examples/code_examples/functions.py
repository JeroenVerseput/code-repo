students = []

def get_students_titlecase():
    students_titlecase = []
    for student in students:
        students_titlecase = student.title()
    return students_titlecase

def print_students_titlecase():
    students_titlecase = get_students_titlecase()
    print(students_titlecase)

def add_student(name):
    students.append(name)

def var_args(name, *args):
    print(name)
    print(args)

def var_args_keywords(name, **kwargs):
    print(name)
    print(kwargs["description"], kwargs["feedback"])

student_list = get_students_titlecase()

add_student("Mark")

print_students_titlecase()

var_args("Mark", "Loves Python", None, True)
var_args_keywords("Mark", description = "Loves Python", feedback = None, pluralsight_subscriber = True)
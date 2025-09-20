# basic class
class Student:

    # class attribute, aka static
    school_name = "Springfield Elementary"

    def __init__(self, name, student_id=332):
        # instance attributes
        self.name = name
        self.student_id = student_id

    def __str__(self):
        return "Student " + self.name
    
    def get_name_capitalize(self):
        return self.name.capitalize()

    def get_school_name(self):
        return self.school_name

class HightSchoolStudent(Student):

    # override class attribute
    school_name = "Springfield High School"

    # override method
    def get_name_capitalize(sef):
        original_value = super().get_name_capitalize()
        return original_value + "-HS"


james = HightSchoolStudent("James")

print(james.get_name_capitalize())

# mark = Student("Mark")

# print(mark)

print(Student.school_name)
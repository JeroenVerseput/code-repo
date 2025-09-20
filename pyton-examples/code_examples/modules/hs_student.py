from student import *

class HighSchoolStudent(Student):

    # override class attribute
    school_name = "Springfield High School"

    # override method
    def get_name_capitalize(sef):
        original_value = super().get_name_capitalize()
        return original_value + "-HS"
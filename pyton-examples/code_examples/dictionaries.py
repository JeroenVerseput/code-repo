# Dictionary
student = {
    "name": "Mark",
    "student_id": 15163,
    "feedback": None
}

print(student["name"])

# print(student["last_name"]) == KeyError

print(student.get("lastname", "Unknown"))

print(student.keys())
print(student.values())

student["name"] = "James"

print(student)

del student["name"]

print(student)


# List of Dictionaries
all_students = [
    { "name": "Mark", "student_id": 15163 },
    { "name": "Katarina", "student_id": 63112 },
    { "name": "Jessica", "student_id": 30021 }
]

for student in all_students:
    print(f"Student {student['name']} with id {student['student_id']}")
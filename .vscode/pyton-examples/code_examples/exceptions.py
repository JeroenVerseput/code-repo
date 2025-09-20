# Dictionary
student = {
    "name": "Mark",
    "student_id": 15163,
    "feedback": None
}

try:
    lastname = student["last_name"]
except KeyError as error:
    print("Error finding last_name")
    print(error)
except Exception:
    print("Unknown error")

print("This code executes")
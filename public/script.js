const API_URL = "/api/students";

const studentForm =
    document.getElementById("studentForm");

const studentMongoId =
    document.getElementById("studentMongoId");

const studentIdInput =
    document.getElementById("studentId");

const nameInput =
    document.getElementById("name");

const programInput =
    document.getElementById("program");

const studentTableBody =
    document.getElementById("studentTableBody");

const submitButton =
    document.getElementById("submitButton");

const cancelButton =
    document.getElementById("cancelButton");

const formTitle =
    document.getElementById("formTitle");

const message =
    document.getElementById("message");


// ==========================================
// READ
// ==========================================

async function loadStudents() {

    try {

        const response =
            await fetch(API_URL);

        const students =
            await response.json();

        studentTableBody.innerHTML = "";


        students.forEach(student => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>
                    ${student.studentId}
                </td>

                <td>
                    ${student.name}
                </td>

                <td>
                    ${student.program}
                </td>

                <td>

                    <button
                        onclick="editStudent('${student._id}')"
                    >
                        Edit
                    </button>

                    <button
                        onclick="deleteStudent('${student._id}')"
                    >
                        Delete
                    </button>

                </td>

            `;

            studentTableBody.appendChild(row);

        });

    } catch (error) {

        showMessage(
            "Unable to load students",
            true
        );

    }

}


// ==========================================
// CREATE / UPDATE
// ==========================================

studentForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const studentData = {

            studentId:
                studentIdInput.value.trim(),

            name:
                nameInput.value.trim(),

            program:
                programInput.value.trim()

        };


        try {

            let response;


            // UPDATE
            if (studentMongoId.value) {

                response = await fetch(

                    `${API_URL}/${studentMongoId.value}`,

                    {

                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(studentData)

                    }

                );

            }


            // CREATE
            else {

                response = await fetch(

                    API_URL,

                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(studentData)

                    }

                );

            }


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message
                );

            }


            showMessage(
                studentMongoId.value
                    ? "Student updated successfully"
                    : "Student added successfully"
            );


            resetForm();

            loadStudents();


        } catch (error) {

            showMessage(
                error.message,
                true
            );

        }

    }
);


// ==========================================
// EDIT
// ==========================================

async function editStudent(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );

        const student =
            await response.json();


        studentMongoId.value =
            student._id;

        studentIdInput.value =
            student.studentId;

        nameInput.value =
            student.name;

        programInput.value =
            student.program;


        formTitle.textContent =
            "Edit Student";

        submitButton.textContent =
            "Update Student";

        cancelButton.style.display =
            "inline-block";


    } catch (error) {

        showMessage(
            error.message,
            true
        );

    }

}


// ==========================================
// DELETE
// ==========================================

async function deleteStudent(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmed) return;


    try {

        const response =
            await fetch(

                `${API_URL}/${id}`,

                {
                    method: "DELETE"
                }

            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message
            );

        }


        showMessage(
            "Student deleted successfully"
        );


        loadStudents();


    } catch (error) {

        showMessage(
            error.message,
            true
        );

    }

}


// ==========================================
// CANCEL
// ==========================================

cancelButton.addEventListener(
    "click",
    resetForm
);


// ==========================================
// RESET
// ==========================================

function resetForm() {

    studentForm.reset();

    studentMongoId.value = "";

    formTitle.textContent =
        "Add Student";

    submitButton.textContent =
        "Add Student";

    cancelButton.style.display =
        "none";

}


// ==========================================
// MESSAGE
// ==========================================

function showMessage(
    text,
    isError = false
) {

    message.textContent = text;

    message.style.color =
        isError ? "red" : "green";


    setTimeout(() => {

        message.textContent = "";

    }, 3000);

}


// Start
loadStudents();
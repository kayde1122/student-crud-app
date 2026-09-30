const express = require("express");

const router = express.Router();

const {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");


// CREATE
router.post("/", createStudent);


// READ ALL
router.get("/", getStudents);


// READ ONE
router.get("/:id", getStudent);


// UPDATE
router.put("/:id", updateStudent);


// DELETE
router.delete("/:id", deleteStudent);


module.exports = router;
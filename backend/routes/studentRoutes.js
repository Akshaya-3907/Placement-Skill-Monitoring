
const express = require("express");
const router = express.Router();

// Import Student Model
const Student = require("../models/student");

// 1. Add New Student
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.status(201).json({
            message: "Student Added Successfully",
            student: student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// 2. Get All Students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// 3. Get Student By ID
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// 4. Update Student
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        res.status(200).json({
            message: "Student Updated Successfully",
            student: student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// 5. Delete Student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        res.status(200).json({
            message: "Student Deleted Successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;

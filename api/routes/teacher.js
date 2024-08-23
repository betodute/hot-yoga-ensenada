const express = require('express');
const router = express.Router();
router.use(express.json());
const teacherController = require('../controllers/teachers');

// Define routes for teacher actions
router.post('/', teacherController.createTeacher); // Create a new teacher
router.get('/', teacherController.getAllTeachers); // Get all teachers
router.get('/:id', teacherController.getTeacherById); // Get a teacher by ID
router.put('/:id', teacherController.updateTeacher); // Update a teacher by ID
router.delete('/:id', teacherController.deleteTeacher); // Delete a teacher by ID

module.exports = router;

const express = require('express')
const router = express.Router()
const controller = require('../controller/studentcontroller')

router.get('/students', controller.getStudents);
router.get('/read/:id', controller.getStudentById);
router.post('/create', controller.createStudent);
router.put('/update/:id', controller.updateStudentById);
router.delete('/delete/:id', controller.deleteStudentById);

module.exports = router;
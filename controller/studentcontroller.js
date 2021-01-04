const { poolPromise } = require('../config/database')
const sql = require('mssql')

class StudentController {

    /* Get All Students */
    async getStudents(req, res) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .execute('sp_fetchStudents', function (err, profileset) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var send_data = profileset.recordset
                        res.json(send_data)
                        // res.json({
                        //     flag: 1,
                        //     message: 'Student fetched.',
                        //     data: profileset.recordset
                        // })
                    }
                })
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    /* Get Student by id */
    async getStudentById(req, res) {
        try {
            const pool = await poolPromise
            var _studentID = parseInt(req.params.id)
            const result = await pool.request()
                .input('id', sql.Int, _studentID)
                .execute('sp_fetchStudentById', function (err, profileset) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var send_data = profileset.recordset
                        res.json(send_data)
                    }
                })
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    /* Create Student */
    async createStudent(req, res) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('name', sql.VarChar(255), req.body.name)
                .input('email', sql.VarChar(255), req.body.email)
                .input('section', sql.VarChar(255), req.body.section)
                .input('subjects', sql.VarChar(sql.MAX), req.body.subjects.map(d => d.name))
                .input('dob', sql.Date, req.body.dob)
                .input('gender', sql.VarChar(255), req.body.gender)
                .execute('sp_insertPersonalDetails', function (err, profileset) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var send_data = 'Data added successfully.'
                        res.json(send_data)
                    }
                })
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    /* Update Student by id */
    async updateStudentById(req, res) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('id', sql.Int, req.body.id)
                .input('name', sql.VarChar(255), req.body.name)
                .input('email', sql.VarChar(255), req.body.email)
                .input('section', sql.VarChar(255), req.body.section)
                .input('subjects', sql.VarChar(sql.MAX), req.body.subjects.map(d => d.name))
                .input('dob', sql.Date, req.body.dob)
                .input('gender', sql.VarChar(255), req.body.gender)
                .execute('sp_updatePersonalDetails', function (err, profileset) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var send_data = 'Data updated successfully.'
                        res.json(send_data)
                    }
                })
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    /* Delete Student by id */
    async deleteStudentById(req, res) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .input('id', sql.Int, req.params.id)
                .execute('sp_deletePersonalDetails', function (err, profileset) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var send_data = 'Student deleted successfully.'
                        res.json(send_data)
                    }
                })
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }
}

const controller = new StudentController()
module.exports = controller;
const express = require('express')
const router = express.Router()
const course = require('../models/course.model')
const m = require('../helpers/middlewares')

module.exports = router

/* All courses */
router.get('/', async (req, res) => {
    await course.getCourses()
    .then(courses => res.json(courses))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A course by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await course.getCourseById(id)
    .then(course => res.json(course))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new course */
router.post('/', m.checkFieldsPost, async (req, res) => {
    await course.addCourse(req.body)
    .then(course => {
        res.location('/courses/' + course.id)
        res.status(201).json({
        message: `The course with number ${course.id} has been created`,
        content: course
    })} 
        )
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a course */
router.put('/:id', m.bodyMustHaveInt, m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    await course.updateCourseById(id, req.body)
    .then(course => 
        res.json({
        message: `The course with number ${id} has been updated`,
        content: course ,
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        else
        res.status(500).json({ message: err.message })
    })
})

/* Delete a course */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await course.deleteCourseById(id)
    .then(course => res.json({
        message: `The course with number ${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        else
        res.status(500).json({ message: err.message })
    })
})
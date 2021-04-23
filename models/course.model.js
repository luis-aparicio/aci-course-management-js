const filename = './data/courses.json'
let courses = require('../data/courses.json')
const helper = require('../helpers/helper')

function getCourses() {
    return new Promise((resolve, reject) => {
        if (courses.length === 0) {
            reject({
                message: 'no courses available',
                status: 202
            })
        }
        console.log("Reading Database...")
        //add courses array to 'get' output 
        var title = '{ "courses" : [] }';
        var allCourses = JSON.parse(title);
        let send = []
        send = courses.filter(course => course.hasOwnProperty('deletedAt') === false)
        allCourses['courses'].push(send)
        resolve(allCourses)
    })
}

function getCourseById(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(courses, id)
        .then(course => resolve(course))
        .catch(err => reject(err))
    })
}

function addCourse(newCourse) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(courses) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newCourse = {...id, ...newCourse, ...date, }
        courses.push(newCourse)
        helper.writeJSONFile(filename, courses)
        resolve(newCourse)
    })
}

function updateCourseById(id, newCourse) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(courses, id)
        .then(course => {
            const index = courses.findIndex(p => p.id == course.id)
            id = { id: course.id }
            const date = {
                createdAt: course.createdAt,
                updatedAt: helper.newDate()
            } 
            courses[index] = {...id, ...newCourse, ...date, }
            helper.writeJSONFile(filename, courses)
            resolve(courses[index])
        })
        .catch(err => reject(err))
    })
}

function deleteCourseById(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(courses, id)
        .then(() => {
            const index = courses.findIndex(course => course.id == id)
            courses[index].updatedAt = helper.newDate();
            courses[index].deletedAt = helper.newDate();
            helper.writeJSONFile(filename, courses)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
 getCourses,
 getCourseById,
 addCourse,
 updateCourseById,
 deleteCourseById
}
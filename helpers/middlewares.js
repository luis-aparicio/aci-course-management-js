// Ensures the ID param is an Int
function mustBeInteger(req, res, next) {
    console.log("Checking parameter's validity...")
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        console.log("Bad Input!")
        res.status(400).json({ message: 'Invalid ID... please use a single integer only.' })
    } else {
        next()
    }
}

//Ensures the data has the two required attributes
function checkFieldsPost(req, res, next) {
    console.log("Checking required attributes...")
    const { name, status } = req.body
    if (name && status) {
        next()
    } else {
        console.log("Bad Input!")
        res.status(400).json({ message: 'The name and status of the course is required. Please revise the request.' })
    }
}
module.exports = {
    mustBeInteger,
    checkFieldsPost
}
// Ensures the ID param is a Int
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
    //also checks that only 2 attributes are entered
    if ((name && status) && (Object.keys(req.body).length === 2)) {
        next()
    } else {
        console.log("Bad Input!")
        res.status(400).json({ message: 'The name and status of the course is required. Only two attributes are allowed. Please revise the request.' })
    }
}
module.exports = {
    mustBeInteger,
    checkFieldsPost
}
const fs = require('fs')
var moment = require('moment');

//Gets new id based on array length
const getNewId = (array) => {
    console.log("Generating ID...")
    if (array.length > 0) {
        return array.length + 1
    } else {
        return 1
    }
}

//ISO 8601 / RFC 3339
const newDate = () => moment().format().slice(0,-6) + 'Z';

//Checks that the requested ID can be found in the data
function mustBeInArray(array, id) {
    console.log("Checking if ID is in data...")
    return new Promise((resolve, reject) => {
        const course = array.find(obj => obj.id == id)
        if (!course) {
            reject({
                message: 'Sorry, the ID you request is not in this database',
                status: 404
            })
        }
    //Returns a 410 if the object is considered deleted
        if(course.hasOwnProperty('deletedAt')) {
            reject({
                message: 'The object associated with the ID you requested has been permanently removed',
                status: 410
            })
        }
        resolve(course)
    })
}

//Writes to local storage 
function writeJSONFile(filename, content) {
    console.log("Writing to database...")
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}


module.exports = {
    getNewId,
    newDate,
    mustBeInArray,
    writeJSONFile
}
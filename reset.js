const helper = require('./helpers/helper');
let courses = require('./data/courses.json');


//reset db
courses = [];
helper.writeJSONFile('./data/courses.json', courses);
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

const port = 3000;

app.use(cors());

app.use(morgan('tiny'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app.listen(port, () => console.log(`Course manager listening on port ${port}!`))

console.log("Refreshing Local Database...")

app.use(require('./routes/index.routes'))


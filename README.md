# aci-course-management-js
A node REST api to manage course data. 

# Getting started 

The server uses node.js and the Express framework. 

## Running Locally with Persistence 

### Requirements 

* Node.js and NPM


To check if installed on your system:
``` node -v && npm -v ```

Installer:
https://nodejs.org/en/download/



* Nodemon 


Wraps server to allow continuous updates from the local database 

Install: 
``` npm install -g nodemon ```

### Instructions
Change to aci-course-management-js directory and run :
 ``` npm install ```
 and then 
 ``` nodemon ```
 
 ## Docker-compose
 
 ### Requirements 
 
 Docker installed on system: https://www.docker.com/products/docker-desktop
 Docker-compose latest version required 
 
 ### Instructions

 From aci-course-management-js directory run :
 
``` docker-compose build ```
and then
``` docker-compose up ```
 
 
## Features 
* GET /courses
* GET /courses/:id
* POST /courses
* PUT /courses/:id
* DELETE /courses/:id

let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");

chai.should();
chai.use(chaiHttp);

describe('Courses API', () => {
    //first checks empty db
    describe("Test GET route /courses when empty", () => {
        it("It should return no courses available", (done) => {
            chai.request(server)
            .get("/courses")
            .end((err,response) => {
                console.log(response.body)
                response.should.have.status(202);
                expect(response.body).to.have.property('message', 'no courses available')
            done();
            });
        });
    });

    //post to empty db
    describe("Test POST route /courses when empty", () => {
        it("It should return a created course", (done) => {
            chai.request(server)
            .post("/courses")
            .send({
                "name": "Linux for Children",
                "status": "available"
              })
            .then(res => {
                console.log(res.body)
                response.should.have.status(201);
                expect(res.body.id).to.exist;
                expect(res.body.name).to.exist;
                expect(res.body.status).to.exist;
                expect(res.body.createdAt).to.exist;
                expect(res.body.updatedAt).to.exist;
              });
              done();
        });
    });

     //post with bad input
     describe("Test POST route /courses with incompatible body", () => {
        it("It should return an error", (done) => {
            chai.request(server)
            .post("/courses")
            .send({
                "name": "Linux for Children",
                "status": "available",
                "id" : 2
              })
            .then(res => {
                console.log(res.body)
                response.should.have.status(400);
                expect(response.body).to.have.property( 'message', 'The name and status of the course is required. Only two attributes are allowed. Please revise the request.')
              });
              done();
        });
    });

    //get id of non empty db
    describe("Test GET route /courses with id", () => {
        it("It should return a single course", (done) => {
            const id = 1
            chai.request(server)
            .get("/courses/"+`${id}`)
            .end((err,response) => {
                console.log(response.body)
                response.should.have.status(200);
                expect(response.body.id).to.equal(id);
                expect(response.body.name).to.exist;
                expect(response.body.status).to.exist;
                expect(response.body.createdAt).to.exist;
                expect(response.body.updatedAt).to.exist;
            done();
            });
        });
    });

    //put with id 
    describe("Test PUT route /courses with id", () => {
        it("It should return OK with updated course", (done) => {
            const id = 1
            chai.request(server)
            .put("/courses/"+`${id}`)
            .send({
                "name": "Linux for Cats",
                "status": "Unavailable",
              })
            .then(res => {
                console.log(res.body)
                response.should.have.status(201);
                expect(res.body.id).to.equal(id);
                expect(res.body.name).to.equal("Linux for Cats");
                expect(res.body.status).to.equal("Unavailable");
                expect(res.body.createdAt).to.exist;
                expect(res.body.updatedAt).to.exist;
              });
              done();
        });
    });

    //delete created course
    describe("Test DELETE route /courses with id", () => {
        it("It should return No Content", (done) => {
            const id = 1
            chai.request(server)
            .delete("/courses/"+`${id}`)
            .then(res => {
                console.log(res.body)
                res.should.have.status(204);
                expect(res.body).to.have.property( 'message', `The course with number ${id} has been updated`)
              });
              done();
        });
    });
});

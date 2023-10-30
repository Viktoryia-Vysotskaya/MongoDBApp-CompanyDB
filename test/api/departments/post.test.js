const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Department = require("../../../models/department.model");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("POST /api/departments", () => {
    it("/ should insert new document to db and return success", async () => {
        const res = await request(server)
            .post("/api/departments")
            .send({ name: "Test Department One" });
        const newDepartment = await Department.findOne({
            name: "Test Department One",
        });
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal("OK");
        expect(newDepartment.name).to.equal("Test Department One");
    });
    after(async () => {
        await Department.deleteMany();
    });
});
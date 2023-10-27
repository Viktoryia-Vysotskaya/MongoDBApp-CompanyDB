const Employee = require("../employee.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employee", () => {
    beforeEach(() => {
        mongoose.models = {};
    });

    it('should throw an error if no "name" is provided', () => {
        const employee = new Employee();
        const validationError = employee.validateSync();
        expect(validationError.errors.firstName).to.exist;
        expect(validationError.errors.lastName).to.exist;
        expect(validationError.errors.department).to.exist;
    });

    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for (let employeeData of cases) {
            const emp = new Employee(employeeData);
            const validationError = emp.validateSync();
            expect(validationError.errors.firstName).to.exist;
            expect(validationError.errors.lastName).to.exist;
            expect(validationError.errors.department).to.exist;
        }
    });

    it("should throw an error if arguments do not contain firstName, lastName, department", () => {
        const cases = [
            { firstName: "John" },
            { lastName: "Doe", department: "Tech" },
            { firstName: "Amanda", lastName: "Watson" },
        ];
        for (let employeeData of cases) {
            const emp = new Employee(employeeData);
            const validationError = emp.validateSync();
            expect(validationError.errors).to.exist;
        }
    });

    it("should not throw an error if firstName, lastName, department is correct", () => {
        const cases = [
            { firstName: "John", lastName: "Doe", department: "Tech" },
            { firstName: "Amanda", lastName: "Watson", department: "Marketing" },
        ];
        for (let employeeData of cases) {
            const emp = new Employee(employeeData);
            const validationError = emp.validateSync();
            expect(validationError).to.be.undefined;
        }
    });

    afterEach(() => {
        mongoose.models = {};
    });
});

const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
    // Clean models before each test
    beforeEach(() => {
        mongoose.models = {};
    });
    it('should throw an error if no "name" arg', async () => {
        const dep = new Department({}); // Create new Department, but don't set `name` attr value
        dep.validateSync(err => {
            expect(err.errors.name).to.exist;
        });
    });
    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for (let name of cases) {
            const dep = new Department({ name });
            dep.validateSync(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });
    // Once testing is complete, clean the models
    after(() => {
        mongoose.models = {};
    });
});

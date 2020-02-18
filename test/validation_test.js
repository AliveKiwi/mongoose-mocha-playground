const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    // user.validate(validationResult=>{}) asynchronous we are not using this because we are not doing anything fancy, we just wanna read the message in validation result
    const validationResult = user.validateSync(); //returns an object that is validation result
    // console.log(validationResult);

    // const message = validationResult.errors.name.message
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });

  it("requires a user's name longer than 2 characters", () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', done => {
    const user = new User({ name: 'Al' });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;

      assert(message === 'Name must be longer than 2 characters.');
      done();
    });
  });
});

const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }
  //We use this method of updating when we wanna do it in some order or trigger or certain fashion.
  //function maybeUpdateName(user){}
  //function maybeUpdateEmail(user){}
  it('instance set n save', done => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('A model instance can update', done => {
    assertName(joe.updateOne({ name: 'Alex' }), done); //update one record
  });

  it('A model class can update', done => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done); //update all record with name joe, and replace by Alex
  });

  it('A model class can find a record with an Id and update', done => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can find a record with an Id and update', done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  it('A user can have their postcount incremented by 1', done => {
    User.updateMany({ name: 'Joe' }, { $inc: { likes: 1 } }).then(() => {
      User.findOne({ name: 'Joe' }).then(user => {
        assert(user.likes === 1);
        done();
      });
    });
  });
});

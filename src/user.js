const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.' //message we want to return when the validation fails
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogPost' }]
});

// joe.postCount will run a function when virtual properties are referenced
UserSchema.virtual('postCount').get(function() {
  return this.posts.length; //this is refering to instance of user model
});

UserSchema.pre('remove', function(next) {
  //this === joe what this function refer
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('user', UserSchema); // user define whats the collection is called in mongo

module.exports = User;

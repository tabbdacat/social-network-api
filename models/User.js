const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: [true, 'Where is your username?'],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Where is your email?'],
        trim: true,
        lowercase: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// creates virtual property called 'friendCount' that gets the amount of user's friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


// Initialize our User model
const User = model('User', userSchema);

module.exports = User;

// tabby id: 657def84fe60e40c8df2d45b
// tabbatha id: 6580d237e69676a01ce6ddde
// test user: 6581e08745eefbab71184739
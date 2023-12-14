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

// // 
// app.get('/api/users', async (req, res) => {
//     try {
//       const users = await User.find({
//         // provides other parameters that coincide with friend 
//         .populate({
//           path: 'friends',
//           // specifies what parameters you would like to join
//           select: 'username'
//         })
//     })
// }
// })


// Initialize our User model
const User = model('User', userSchema);

module.exports = User;

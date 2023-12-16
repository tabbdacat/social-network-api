const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

// Child documents or subdocuments can be embedded into a parent document
// the reactionSchema defines the shape for reaction subdocument
const reactionSchema = new Schema({
    type: Schema.Types.ObjectId,
    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, 'Text must be less than 280 characters in length'],
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => dayjs(date).format('DD/MM/YYYY'),
    },

  });

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: [true, 'Where is your text?'],
        minlength: 1, 
        maxlength: [280, 'Text must be less than 280 characters in length'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    username: {
        type: String,
        required: true,

    },
    reactions: [
       reactionSchema,
    ] 
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



// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

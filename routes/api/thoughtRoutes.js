const router = require('express').Router();
const { Thought, User } = require('../../models');

// route to get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
 });

// route to get thought by id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

//  route to post a new thought
router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        User.findOneAndUpdate({username: req.body.username}, {$push: {thoughts: thought._id}})
        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});


// route to update a thought by its id
router.put('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
        req.params.id,
        {
            thoughtText: req.body.thoughtText,
        },
        {
            new: true,
        }
        );
        await thought.save();
        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
 });

// route to delete a thought by id
router.delete('/api/thoughts/:id', async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      res.json(deletedThought);
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    }
  })


  module.exports = router;
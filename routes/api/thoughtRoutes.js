const router = require('express').Router();
const { Thought } = require('../../models');

// route to get all thoughts
app.get('/api/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
 });

// route to get thought by id
app.get('/api/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

// route to update a thought by its id
app.put('/api/thoughts/:id', async (req, res) => {
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
app.delete('/api/thoughts/:id', async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      res.json(deletedThought);
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    }
  })


  module.exports = router;
const router = require('express').Router();
const { Thought, User } = require('../../models');

// route to get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// route to get thought by id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

//  route to post a new thought
router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            return res
                .status(404)
                .json({ message: 'Thought created, but found no user with that ID' });
        }

        res.json(thought);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }

});


// route to update a thought by its id
router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.id,
            { thoughtText: req.body.thoughtText },
            { new: true }
        );
        await thought.save();
        res.json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// route to delete a thought by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        res.json(deletedThought);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
})

// route to post a new reaction
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
    } catch (err) {
        console.log(error);
        res.status(500).json({ error });
    }
});


// route to delete a reaction by id
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        console.log(req.params);
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true },
        )
        console.log(thought);
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
    } catch (err) {
        console.log(error);
        res.status(500).json({ error });
    }
})


module.exports = router;
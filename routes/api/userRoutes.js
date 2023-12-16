const router = require('express').Router();
const { User } = require('../../models');

// route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
      // provides other parameters that coincide with friend 
      .populate('thoughts')
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
 });

// route to get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

//  route to post a new user
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

// route to update a user by its id
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            username: req.body.username,
            email: req.body.email,
        },
        {
            new: true,
        }
        );
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
 });

// route to delete a user by id
router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.json(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    }
  })

// PUT request to add a friend to someone
router.put('/addFriend/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: {
            friendIds: req.body.friendId,
          }
        },
        {
          new: true,
        }
      );
  
      res.json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    }
  })



  module.exports = router;
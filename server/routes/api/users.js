/* eslint-disable no-use-before-define */
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Users
router.get('/', async (_req, res) => {
  try {
    const userCollection = await getUserCollection();
    const users = await userCollection.find({}).toArray();
    res.send({
      users,
      message: 'Users fetched successfully',
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: err,
    });
  }
});

// Add User
router.post('/', async (req, res) => {
  const users = await getUserCollection();
  await users.insertMany([{
    fname: req.body.fname,
    lname: req.body.lname,
    age: req.body.age,
    gender: req.body.gender,
    createAt: new Date(),
  }]);
  res.status(201).send({
    message: 'User Added successfully',
  });
});

// Delete User

router.delete('/:id', async (req, res) => {
  const users = await getUserCollection();
  await users.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(200).send({
    message: 'User deleted successfully',
  });
});

// Update User
router.put('/:id', async (req, res) => {
  const users = await getUserCollection();
  await users.updateOne({ _id: new mongodb.ObjectId(req.params.id) },
    {
      $set: {
        fname: req.body.fname,
        lname: req.body.lname,
        age: req.body.age,
        gender: req.body.gender,
      },
    },
    { upsert: true });
  res.status(201).send({
    message: 'User Updated successfully',
  });
});

router.get('/:id', async (req, res) => {
  const users = await getUserCollection();
  users.findOne({ _id: new mongodb.ObjectId(req.params.id) }, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      res.sendStatus(500);
    }
  });
});

async function getUserCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://abc123:abc1234@vue-express.3zfht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  });

  return client.db('vue-express').collection('post');
}

module.exports = router;

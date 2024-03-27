const UserModel = require('../../models/User');
const { signToken } = require('../../utils/auth'); //jwt
const router = require('express').Router();

validateBook = async (user, id) => {
  let index = await user.books.findIndex(n => n.id == id);
  if (index !== -1) {
    return index;
  } else {
    user.books.push({ id });
    await user.save()
    return user.books.length - 1
  }
}

router.post('/signup/:email/:name', async (req, res) => {
  try {
    const { email, name } = req.params;

    const newUser = new UserModel({ email, name });
    await newUser.save();
    res.status(200).json({ newUser }); 

  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.get('/login/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      return res.status(404).send("You haven't signed up yet.");
    }
    
       
    res.status(200).json({ name: user.name, email: user.email, homebook: user.homebook });
  } catch (err) {
    console.log(err);
    res.status(400).send("Server is having some trouble.");
  }
});



router.post('/rename/:email/:name', async (req, res) => {
  try {
    const { email, name } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      user.name = name;
      await user.save();
      res.status(200).send("User renamed Successfully!")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/cleardata/:email', async (req, res) => {
  try {
    const { email, name } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      user.books = [];
      await user.save();
      res.status(200).send("Data cleared")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/sethomebook/:email/:id', async (req, res) => {
  try {
    const { email, id } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      user.homebook = id;
      await user.save();
      res.status(200).send("Homebook set Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/removehomebook/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      user.homebook = null;
      await user.save();
      res.status(200).send("Homebook removed Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/ratebook/:email/:id/:rating', async (req, res) => {
  try {
    const { email, id, rating } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      user.books[index].rating = rating;
      await user.save();
      res.status(200).send("Rated Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/updatepage/:email/:id/:page', async (req, res) => {
  try {
    const { email, id, page } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      user.books[index].pagenow = page;
      await user.save();
      res.status(200).send("Page updated Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/updatereview/:email/:id/:review', async (req, res) => {
  try {
    const { email, id, review } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      user.books[index].review = review;
      await user.save();
      res.status(200).send("Review updated Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/updatenotes/:email/:id/:notes', async (req, res) => {
  try {
    const { email, id, notes } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      let newnotes = JSON.parse(notes)
      user.books[index].notes = newnotes;
      await user.save();
      res.status(200).send("Notes updated Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.post('/deletereview/:email/:id', async (req, res) => {
  try {
    const { email, id } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      const index = await validateBook(user, id)
      user.books[index].review = null;
      await user.save();
      res.status(200).send("Review deleted Successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});


router.get('/getbook/:email/:id', async (req, res) => {
  try {
    const { email, id } = req.params;
    const user = await UserModel.findOne({ email });
    if (!user) res.status(404).send("No such user");
    else {
      let data = user.books.find(n => n.id == id)
      if (!data) {
        res.status(204).send({})
      } else {
        res.status(200).send(data)
      }
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("server is having some trouble.");
  }
});




module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "suhailisagood$oy";



//ROUTE: 1 create a user POST "/api/auth/createuser" doesnt require auth login bcoz this new user aho 
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    // check whether user with this email already exists
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success, error: "sorry user already exists with Email ID" })
    }
    // securing the password 
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    // create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    // authentication token
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    success = true;
    res.json({ success, authtoken })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
})

//ROUTE 2: AUTHENTICATE A USER  POST "/api/auth/login" doesnt require login 
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct Credentials"
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct Credentials"
      });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server ERROR");
  }
})
// ROUTER 3: get logged in user detail using POST. login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server ERROR");
  }
})
module.exports = router
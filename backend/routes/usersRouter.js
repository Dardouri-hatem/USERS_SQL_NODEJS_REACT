const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require('../middleware/verifyToken')
require("dotenv");
const {
  ValidationRegister,
  ValidationLogin,
  ValidationUpdate,
} = require("../controller/validation");

/*---------------------------------------- GETTING ALL USERS ------------------------------------------*/

router.get("/",verify, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Getting_Fail:" + error);
  }
});

/*---------------------------------------- REGISTER A NEW USER ------------------------------------------*/

router.post("/add_user", async (req, res) => {
  // Validate Data before create a new user
  const { error } = ValidationRegister(req.body);
  if (error) res.status(400).send(error.details[0].message);
  else {
    // Validate if Name exist !!
    const user = await User.findOne({ where: { name: req.body.name } });
    if (user) res.status(400).send("Name already exist");
    else {
      try {
        let { name, family_name, password } = req.body;
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //  Create A new User
        const user = await User.create({
          name,
          family_name,
          password: hashedPassword,
        });
        res.status(200).send(user);
      } catch (error) {
        res.status(400).send("Register Fail : " + error);
      }
    }
  }
});

/*---------------------------------------- LOGIN USER ------------------------------------------*/

router.post("/login", async (req, res) => {
  try {
    // Validation
    const { error } = ValidationLogin(req.body);
    if (error) res.status(400).send("invalid name or password");
    // Check if name is found
    const user = await User.findOne({ where: { name: req.body.name } });
    if (!user) res.status(400).send("Invalid name or password");
    else {
      // Check password
      const passwordVerify = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordVerify) res.status(400).send("Invalid name or password");
      else {
        // Create and assgin a token
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        res.header("auth-token", token).status(200).send({ user, token });
      }
    }
  } catch (error) {
    res.status(400).send("Login Fail : " + error);
  }
});
// Last Login Date 
router.put('/login/:id', async(req,res)=>{
  try {
  // Update
  await User.update(
    { last_login_date : new Date()},
    { where: {id: req.params.id }}
  );
  const user = await User.findOne({id: req.params.id });
  res.status(200).send(user);
  } catch (error) {
    res.status(400).send('Fail Update ',error)
  }
})

/*---------------------------------------- DELETE USER ------------------------------------------*/

router.delete('/delete_user/:id',verify, async(req,res)=>{
try {
  await User.destroy({where:{id : req.params.id}});
  res.status(200).send("User Deleted successfully")
} catch (error) {
  res.status.send("Delete Fail : "+ error)
}
})

/*---------------------------------------- UPDATE USER ------------------------------------------*/
router.put('/update_user/:id',verify, async(req,res)=>{
  try {
  // // Update
  await User.update(
    { name: req.body.name, family_name: req.body.family_name, update_at: new Date() },
    { where: {id: req.params.id }}
  );
  // return the user updated to update the view
  const user = await User.findOne({id: req.params.id });
  res.status(200).send(user);
  } catch (error) {
    res.status(400).send('Fail Update ',error)
  }
})

module.exports = router;

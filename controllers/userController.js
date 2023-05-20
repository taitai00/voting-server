const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "20m" });
};

// login a user
const loginUser = async (req, res) => {
  const { orgName, code } = req.body;

  try {
    const user = await User.login(orgName, code);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ orgName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//testing
// signup a user
const signupUser = async (req, res) => {
  const { adminCode, orgName, code } = req.body;

  try {
    const user = await User.signup(adminCode, orgName, code);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ orgName, token });
  } catch (error) {
    //console.log("THISIIS " + error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };

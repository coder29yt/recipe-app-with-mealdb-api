const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user;
    user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: "Please login" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    await user.save();

    return res
      .status(201)
      .json({ success: true, message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user;
    user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Please signup" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now()),
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkUser = async (req, res) => {
  const id = req.id;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, message: "Please signup" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

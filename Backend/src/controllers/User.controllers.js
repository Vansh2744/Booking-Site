import User from "../models/User.models.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.ACCESSTOKEN_SECRET, {
      expiresIn: process.env.ACCESSTOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESHTOKEN_SECRET, {
      expiresIn: process.env.REFRESHTOKEN_EXPIRY,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return error.message;
  }
};

const setCookies = async (res, accessToken, refreshToken) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
  } catch (error) {
    return res.status(400).json({
      message: `unable to set cookie : ${error.message}`,
      success: false,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field == "")) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        message: "Failed to create user",
        success: false,
      });
    }

    const { accessToken, refreshToken } = generateToken(user._id);
    setCookies(res, accessToken, refreshToken);

    user.refreshToken = refreshToken;
    await user.save();

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: createdUser,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Falied to signup : " + error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => field == "")) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Unauthorized credentials",
        success: false,
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const { accessToken, refreshToken } = generateToken(user._id);

    setCookies(res, accessToken, refreshToken);

    user.refreshToken = refreshToken;
    await user.save();

    const loginUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: loginUser,
    });
  } catch (error) {
    res.status(401).json({
      message: "Failed to login : " + error.message,
      success: false,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({ data: user, success: true });
  } catch (error) {
    return res
      .status(401)
      .json({
        message: "Failed to get profile : " + error.message,
        success: false,
      });
  }
};

export { signup, login, getProfile };

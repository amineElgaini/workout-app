const mongoose = require("mongoose");
const { PasswordHash } = require("./../helpers/functions");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// signup a user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    const user_id = req.params.id;
    try {
        const users = await User.findById(user_id);
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await User.createUser(email, password, role);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such User" });
    }

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
        return res.status(400).json({ error: "No such user" });
    }

    res.status(200).json(user);
};

// update a user
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such user" });
    }

    const password = req.body.password;
    if (password) {
        req.body.password = await PasswordHash(password);
    }

    const user = await User.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!user) {
        return res.status(400).json({ error: "No such user" });
    }

    res.status(200).json(user);
};

/* user crud */
const getMyProfile = async (req, res) => {
    const user_id = req.user.id;
    try {
        const users = await User.findById(user_id);
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a user
const deleteMyProfile = async (req, res) => {
    const id = req.user._id;

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
        return res.status(400).json({ error: "No such user" });
    }

    res.status(200).json(user);
};

// update a user
const updateMyProfile = async (req, res) => {
    const id = req.user._id;

    const password = req.body.password;
    if (password) {
        req.body.password = await PasswordHash(password);
    }

    const user = await User.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!user) {
        return res.status(400).json({ error: "No such user" });
    }

    res.status(200).json(user);
};

module.exports = {
    signupUser,
    loginUser,
    addUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    getMyProfile,
    updateMyProfile,
    deleteMyProfile,
};

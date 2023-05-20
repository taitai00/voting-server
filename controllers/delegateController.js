const Voting = require("../models/delegateModel");
const mongoose = require("mongoose");

// get all delegatess
const getDelegates = async (req, res) => {
  const user_id = req.user._id;

  const delegates = await Voting.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(delegates);
};

// get a single delegate
const getDelegate = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such delegate" });
  }

  const delegate = await Voting.findById(id);

  if (!delegate) {
    return res.status(404).json({ error: "No such delegate" });
  }

  res.status(200).json(delegate);
};

// create new delegate
const createDelegate = async (req, res) => {
  const { zotang, zolia, idol } = req.body;

  let emptyFields = [];

  if (!zotang) {
    emptyFields.push("zotang");
  }
  if (!zolia) {
    emptyFields.push("zolia");
  }
  if (!idol) {
    emptyFields.push("idol");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const delegate = await Voting.create({ zotang, zolia, idol, user_id });
    res.status(200).json(delegate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a voting
const deleteDelegate = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such voting" });
  }

  const delegate = await Voting.findOneAndDelete({ _id: id });

  if (!delegate) {
    return res.status(400).json({ error: "No such voting" });
  }

  res.status(200).json(delegate);
};

// update a voting
const updateDelegate = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such voting" });
  }

  const voting = await Voting.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!voting) {
    return res.status(400).json({ error: "No such voting" });
  }

  res.status(200).json(voting);
};

module.exports = {
  getDelegates,
  getDelegate,
  createDelegate,
  deleteDelegate,
  updateDelegate,
};

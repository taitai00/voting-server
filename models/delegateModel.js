const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const delegateSchema = new Schema(
  {
    zotang: {
      type: String,
      required: true,
    },
    zolia: {
      type: String,
      required: true,
    },
    idol: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delegate", delegateSchema);

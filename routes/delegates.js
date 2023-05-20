const express = require("express");
const {
  createDelegate,
  getDelegates,
  getDelegate,
  deleteDelegate,
  updateDelegate,
} = require("../controllers/delegateController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get("/", getDelegates);

//GET a single workout
router.get("/:id", getDelegate);

// POST a new workout
router.post("/", createDelegate);

// DELETE a workout
router.delete("/:id", deleteDelegate);

// UPDATE a workout
router.patch("/:id", updateDelegate);

module.exports = router;

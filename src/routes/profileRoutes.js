const express = require("express");

const {
  analyze,
  getAll,
  getOne,
  getStats
} = require("../controllers/profileController");

const router = express.Router();

router.get("/stats", getStats);

router.post("/analyze/:username", analyze);

router.put("/reanalyze/:username", analyze);

router.get("/", getAll);

router.get("/:username", getOne);

module.exports = router;
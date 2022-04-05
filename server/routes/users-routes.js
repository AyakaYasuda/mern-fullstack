const express = require("express");

const router = express.Router();

const DUMMY_USERS = [
  {
    id: "u1",
    name: "dummy user",
    places: 3,
  },
];

router.get("/", (req, res, next) => {
  res.json(DUMMY_USERS);
});

module.exports = router;

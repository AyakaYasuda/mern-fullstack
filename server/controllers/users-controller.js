const DUMMY_USERS = [
  {
    id: "u1",
    username: "dummy user",
    email: "dummy@mail.com",
    password: "password",
  },
];

const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const getUsers = (req, res, next) => {
  const users = DUMMY_USERS;

  if (!users || users.length === 0) {
    return next(new HttpError("Could not find users"), 404);
  }

  res.json({ users: users });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { username, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(user => user.email === email);

  if (hasUser) {
    return next(
      new HttpError("Could not create a user, email already exists", 422)
    );
  }

  const newUser = {
    id: uuidv4(),
    username,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);

  res.status(201).json({ user: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(user => user.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError(
        "Couldn't identify the user, credentials seem to be wrong",
        404
      )
    );
  }
  res.status(200).json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

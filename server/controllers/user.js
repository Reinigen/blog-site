//[SECTION] Dependencies and Modules
const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");

const { errorHandler } = auth;

module.exports.checkEmailExists = (req, res) => {
  if (req.body.email.includes("@")) {
    return User.find({ email: req.body.email })
      .then((result) => {
        if (result.length > 0) {
          return res.status(409).send({ message: "Duplicate email found" });
        } else {
          return res.status(404).send({ message: "No duplicate email found" });
        }
      })
      .catch((error) => errorHandler(error, req, res));
  } else {
    res.status(400).send({ message: "Invalid email format" });
  }
};

module.exports.registerUser = (req, res) => {
  // Checks if the email is in the right format
  if (!req.body.email.includes("@")) {
    // if the email is not in the right format, send a message 'Invalid email format'.
    return res.status(400).send({ message: "Email invalid" });
  } else if (req.body.password.length < 8) {
    // If the password is not atleast 8 characters, send a message 'Password must be atleast 8 characters long'.
    return res
      .status(400)
      .send({ message: "Password must be atleast 8 characters long" });
    // If all needed requirements are achieved
  } else {
    let newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    return (
      newUser
        .save()
        // if all needed requirements are achieved, send a success message 'User registered successfully' and return the newly created user.
        .then((result) =>
          res.status(201).send({
            message: "User registered successfully",
            user: result,
          })
        )
        .catch((error) => errorHandler(error, req, res))
    );
  }
};

module.exports.loginUser = (req, res) => {
  if (req.body.email.includes("@")) {
    return User.findOne({ email: req.body.email })
      .then((result) => {
        if (result == null) {
          // if the email is not found, send a message 'No email found'.
          return res.status(404).send({ message: "No email found" });
        } else {
          const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            result.password
          );
          if (isPasswordCorrect) {
            // if all needed requirements are achieved, send a success message 'User logged in successfully' and return the access token.
            return res.status(200).send({
              message: "User logged in successfully",
              access: auth.createAccessToken(result),
            });
          } else {
            // if the email and password is incorrect, send a message 'Incorrect email or password'.
            return res
              .status(401)
              .send({ message: "Incorrect email or password" });
          }
        }
      })
      .catch((error) => errorHandler(error, req, res));
  } else {
    // if the email used in not in the right format, send a message 'Invalid email format'.
    return res.status(400).send({ message: "Invalid email format" });
  }
};

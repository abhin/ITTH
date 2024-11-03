import bcrypt from "bcrypt";
import User from "../modals/user.js";
import { sendEmail } from "../utilities/function.js";

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Invalid login.",
    });
  }

  const existingUser = await User.findOne({ email });
  const match = await bcrypt.compare(password, existingUser.password);

  if (existingUser == null || !match) {
    res.status(400).json({
      success: false,
      message: "Invalid login credentials.",
    });
  } else if (!existingUser.active) {
    res.status(400).json({
      success: false,
      message: "Account is inactive.",
    });
  } else {
    res.status(200).json({
      success: true,
      user: existingUser,
    });
  }
}

async function create(req, res) {
  const { name, email, password, active } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Failed to create User name, email, password are required.",
    });
  }

  const existingUser = await User.exists({ email });

  if (existingUser != null) {
    res.status(400).json({
      success: false,
      message: "User already exists",
      data: existingUser,
    });
  } else {
    const passwordHash = await bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    User.create({ name, email, password: passwordHash, active })
      .then((data) => {
        const status = sendEmail({
          to: email,
          subject: "ToDo Account Activation",
          text: `
            Welcome ${name}!
            Thank you for signup
            Please click on the bewlo link to activate your account. 
            Link: https://www.google.com/    
        `,
        })
          .then((data) => {
            console.log(status);

            if (status) {
              res.status(200).json({
                success: true,
                message: "User is created.",
                user: data,
              });
            }
          })
          .catch((err) => {
            res.status(400).json({
              success: false,
              message: "Error found during User creation",
              error: err,
            });
          });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Error found during User creation",
          error: err,
        });
      });
  }
}

function getAllUsers(req, res) {
  User.find()
    .then((data) => {
      res.status(200).json({
        success: true,
        user: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Error found during User creation",
        error: err,
      });
    });
}

async function update(req, res) {
  const { id, name, email, password, active } = req.body;
  const existingUser = await User.exists({ email, _id: { $ne: id } });

  if (existingUser != null) {
    res.status(400).json({
      success: false,
      message: "This email is already used. ",
    });
  } else {
    const statusChange = (email != existingUser?.email && false) || active;
    User.findByIdAndUpdate(id, { name, email, password, active: statusChange })
      .then((data) => {
        res.status(200).json({
          success: true,
          message: "User is Updated",
          User: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Error found during User creation",
          error: err,
        });
      });
  }
}

async function deleteUser(req, res) {
  const { _id } = req?.params;
  const existingUser = await User.exists({ _id });

  if (existingUser == null) {
    res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  } else {
    User.findByIdAndDelete(_id)
      .then((data) => {
        res.status(200).json({
          success: true,
          message: `User is deleted Id: ${_id}`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Error found during User creation",
          error: err,
        });
      });
  }
}

export { create, getAllUsers, update, deleteUser, login };

import bcrypt from "bcrypt";
import User from "../modals/user.js";
import { sendEmail } from "../utilities/function.js";
import jwt from "jsonwebtoken";

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

  try {
    const existingUser = await User.exists({ email });

    if (existingUser != null) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        data: existingUser,
      });
    }

    const passwordHash = await bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const user = await User.create({
      name,
      email,
      password: passwordHash,
      active,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Error found during User creation",
        error: err,
      });
    }

    const token = jwt.sign({uId: user._id}, process.env.JWT_KEY, { expiresIn: '1h' });

    const status = await sendEmail({
      to: email,
      subject: "Your ToDo Account Activation",
      text: `
              Welcome ${name}!
              Thank you for signup
              Please click on the bewlo link to activate your account. 
              Link: http://localhost:8000/api/v1/users/activate/${token}  
          `,
    });

    if (status) {
      return res.status(200).json({
        success: true,
        message: "User is created.",
        user: user,
      });
    }
  
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Exception error catch fround.",
      error: e.message,
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


async function activate(req, res) {
    const {token} = req.params;

    try {
      const userId = jwt.verify(token, process.env.JWT_KEY);
      const activated = await User.findById(userId?.uId);

      if (activated?.active) {
        return res.status(400).json({
          success: false,
          message: "Invalid url"
        });
      }

      const user = await User.findByIdAndUpdate(userId?.uId, {active: true});

      if (user) {
        const status = await sendEmail({
          to: user.email,
          subject: "Your ToDo Account is activated",
          text: `
                  Thank you ${user.name}!
                  Your account is activated successfully. Now you can use the todo account.
              `,
        });
    
        if (status) {
          return res.status(200).json({
            success: true,
            message: "Account is activated",
            user: user,
          });
        }
      } else {
        throw new Error('Activation failed. Please check the URL is valid.');
      }
    } catch(e) {
      res.status(400).json({
        success: false,
        error: e.message,
      });
    }
    
}

export { create, getAllUsers, update, deleteUser, login, activate };

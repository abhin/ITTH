import User from "../modals/user.js";

async function create(req, res) {
  const { name, email, password, active } = req.body;

  const existingUser = await User.exists({ email });

  if (existingUser != null) {
    res.status(400).json({
      success: false,
      message: "User already exists",
      data: existingUser,
    });
  } else if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Failed to create User name, email, password are required.",
    });
  } else {
    User.create({ name, email, password, active })
      .then((data) => {
        res.status(200).json({
          success: true,
          message: "User is created.",
          User: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Error found during User creation",
          User: err,
        });
      });
  }
}

function getAllUsers(req, res) {
  User.find()
    .then((data) => {
      res.status(200).json({
        success: true,
        User: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Error found during User creation",
        User: err,
      });
    });
}

async function update(req, res) {
  const { id, name, email, password, active } = req.body;
  const existingUser = await User.exists({ email, _id: { $ne: id } });

  if (existingUser != null) {
    res.status(400).json({
      success: false,
      message: "This email is already used. "
    });
  } else {
    const statusChange = email != existingUser?.email && false || active;
    
    console.log(statusChange);

    User.findByIdAndUpdate(id, { name, email, password, active: statusChange})
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
          User: err,
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
          User: err,
        });
      });
  }
}

export { create, getAllUsers, update, deleteUser };

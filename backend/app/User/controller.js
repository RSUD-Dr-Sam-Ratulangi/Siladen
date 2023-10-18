const User = require("./model");

//@description     Get All User data
//@route           GET /api/users
//@access          Protected
const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id_user", "name", "username", "role", "job", "token"],
    });

    res.status(200).json({
      code: "200",
      status: "OK",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error,
    });
  }
};

//@description     Get User data By Id
//@route           GET /api/users/:id_user
//@access          Protected
const getUserById = async (req, res) => {
  const id_user = req.params.id_user;
  try {
    const user = await User.findOne({
      where: {
        id_user,
      },
      attributes: ["id_user", "name", "username", "job", "role"],
    });

    if (!user) {
      return res.status(404).json({
        code: "404",
        status: "NOT_FOUND",
        errors: "User is not found",
      });
    }

    res.status(200).json({
      code: "200",
      status: "OK",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error,
    });
  }
};

module.exports = {
  getAllUser,
  getUserById,
};

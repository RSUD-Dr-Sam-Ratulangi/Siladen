const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config");
const User = require("../app/User/model");

const VerifyTokenAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "No Token",
    });

  try {
    const user = await User.findOne({
      where: {
        token,
      },
    });

    if (!user) {
      return res.status(403).json({
        code: "403",
        status: "FORBIDEN",
        errors: "Authentication required. Please login to access this resource.",
      });
    }

    const decoded = jwt.verify(token, tokenSecret);

    if (decoded.role !== "admin")
      return res.status(401).json({
        code: "401",
        status: "UNAUTHORIZED",
        errors: "Please Login as Admin!!",
      });

    req.id_user = decoded.id_user;

    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      User.update(
        {
          token: null,
        },
        {
          where: {
            token,
          },
        }
      );
      return res.status(401).json({
        code: "401",
        status: "UNAUTHORIZED",
        errors: "Your session has ended. Please login again!!",
      });
    } else {
      return res.status(400).json({
        code: "400",
        status: "BAD_REQUEST",
        errors: error.message,
      });
    }
  }
};

module.exports = VerifyTokenAdmin;

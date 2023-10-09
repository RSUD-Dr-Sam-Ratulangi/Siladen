const jwt = require("jsonwebtoken");
const User = require("../User/model");
const bcrypt = require("bcrypt");

const { tokenSecret } = require("../../config");

//@description     Register User
//@route           POST /auth/user/register
//@access          Public
const registerUser = async (req, res) => {
  const { name, username, password, konfirmasi_password, role } = req.body;

  if (name && username && password && konfirmasi_password && role) {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (user)
        return res.status(409).json({
          code: "409",
          status: "CONFLICT",
          errors: "Username already exists",
        });

      if (password !== konfirmasi_password)
        return res.status(400).json({
          code: "400",
          status: "BAD_REQUEST",
          errors: "Password and confirmation password do not match",
        });

      // Enkripsi password
      const salt = await bcrypt.genSalt();
      const hashingPassword = await bcrypt.hash(password, salt);

      await User.create({
        name,
        username,
        password: hashingPassword,
        role,
      });

      res.status(201).json({
        code: "201",
        status: "CREATED",
        data: {
          name,
          username,
          password,
          role,
        },
      });
    } catch (error) {
      return res.status(500).json({
        code: "500",
        status: "INTERNAL_SERVER_ERROR",
        errors: error.message,
      });
    }
  } else {
    return res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "Name, Username, Password and password confirmation Fields Are Required",
    });
  }
};

//@description     Login User
//@route           POST /auth/user/login
//@access          Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });

      // username input tidak sama dengan username di database
      if (username !== user.username) {
        return res.status(400).json({
          code: "400",
          status: "BAD_REQUEST",
          errors: "User not found",
        });
      }

      // USERNAME TIDAK ADA DI DATABASE
      if (!user)
        return res.status(400).json({
          code: "400",
          status: "BAD_REQUEST",
          errors: "User not found",
        });

      // User sedang login di akun lain
      if (user.token) {
        return res.status(403).json({
          code: "403",
          status: "FORBIDDEN",
          errors: "Akun sedang login di perangkat lain",
        });
      }

      // PASSWORD TIDAK COCOK
      const match = await bcrypt.compare(password, user.password);
      console.log(match);
      console.log(password);
      console.log(user.password);

      if (!match)
        return res.status(401).json({
          code: "400",
          status: "BAD_REQUEST",
          errors: "Incorrect Password",
        });

      const id_user = user.id_user;
      const role = user.role;
      const name = user.name;

      const token = jwt.sign({ id_user, username, role }, tokenSecret, {
        expiresIn: "2d",
      });

      await User.update(
        { token },
        {
          where: {
            id_user,
          },
        }
      );

      // res.cookie("refresh_token", refreshToken, {
      //   httpOnly: true,
      //   // expire in 1 day
      //   maxAge: 24 * 60 * 60 * 1000,
      // });

      // const maxAgesInSeconds = 24 * 60 * 60;
      // const cookie = `refresh_token=${refreshToken}; HttpOnly; samesite=none; secure; Max-Age=${maxAgesInSeconds};`;

      // res.setHeader("set-cookie", [cookie]).status(200).json({
      //   code: "200",
      //   status: "OK",
      //   data: {
      //     id_user,
      //     username,
      //     accessToken,
      //   },
      // });

      res.status(200).json({
        code: "200",
        status: "OK",
        data: {
          id_user,
          name,
          username,
          role,
          token,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        code: "500",
        status: "INTERNAL_SERVER_ERROR",
        errors: error.message,
      });
    }
  } else {
    return res.status(400).json({
      code: "400",
      status: "BAD_REQUEST",
      errors: "Username and Password Fields Are Required",
    });
  }
};

const logoutUser = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      code: "401",
      status: "UNAUTHORIZED",
      errors: "User hasn't login yet",
    });
  }
  try {
    const user = await User.findOne({
      where: {
        token,
      },
    });

    if (!user) {
      return res.status(404).json({
        code: "404",
        status: "NOT_FOUND",
        errors: "User is not found",
      });
    }

    const update = await User.update(
      {
        token: null,
      },
      {
        where: {
          id_user: user.id_user,
        },
      }
    );

    return res.status(200).json({
      code: "200",
      status: "OK",
      success: update ? true : false,
    });
  } catch (error) {
    res.status(500).json({
      code: "500",
      status: "INTERNAL_SERVER_ERROR",
      errors: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};

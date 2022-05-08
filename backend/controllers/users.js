const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../lib/generateToken");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(7);
  saltPassword = await bcrypt.hash(password, salt);
  const result = await prisma.user.create({
    data: {
      username,
      email,
      password: saltPassword,
    },
  });
  res.json({ success: true, message: "data added" });
});

exports.getUser = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users: users });
});

exports.login = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.json({ success: false, message: "user not found" });
  }
  var passwordIsValid = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!passwordIsValid) {
    return res.json({ success: false, message: "invalid email or password" });
  }
  const token = generateToken(user.id);
  res.json({ success: true, user, token });
});

exports.userProfile = asyncHandler(async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: {
          id: decode.id,
        },
      });
      if (!user) {
        return res.json({ success: false, message: "user not found" });
      }
      res.status(200).json({ success: true, user: user });
    } catch (error) {
      console.log(error);
    }
  }
});

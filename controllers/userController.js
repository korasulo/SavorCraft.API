/*const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const app = express();
app.use(express.json());

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const emailCheckQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = ?";
  const [emailCheckResult] = await db.query(emailCheckQuery, [email]);
  const emailExists = emailCheckResult[0].count > 0;

  if (emailExists) {
    return res
      .status(400)
      .json({ error: "Email already exists in the database" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const columnsToInsert = "email, password, role";
  const valuesToInsert = [email, hashedPassword, role];
  const placeholders = valuesToInsert.map(() => "?").join(", ");

  const insertQuery = `INSERT INTO Users (${columnsToInsert}) VALUES (${placeholders})`;

  try {
    await db.query(insertQuery, valuesToInsert);
    res.send("User registered successfully");
  } catch (error) {
    console.error("Database query failed", error);
    res.status(500).send("Internal Server Error");
  }
});

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const getUserQuery = "SELECT * FROM Users WHERE email = ?";
    const [userResult] = await db.query(getUserQuery, [email]);

    if (userResult.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = userResult[0];
    console.log("User from database:", user);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      throw new Error("Email or password invalid!");
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    console.log("Login successful!");
    res.status(200).json({ accessToken, role: user.role });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(401).json({ error: error.message });
  }
};

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
*/
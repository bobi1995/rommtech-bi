import express from "express";
import { connection } from "../../db/lite/connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface UserInterface {
  id: string;
  username: string;
  password: string;
  access: string;
}
const secret = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const authRoute = express.Router();
const getUserTable = () => connection.table<UserInterface>("users");

//GET ALL USERS
authRoute.get("/users", async (req, res) => {
  try {
    const results = await getUserTable().select();
    return res.send(results);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

//GET USER BY ID
authRoute.get("/user", async (req, res) => {
  const userId = req.query.id;

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  try {
    const results = await getUserTable()
      .where({ id: userId.toString() })
      .first();
    return res.send(results);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

//CREATE USER
authRoute.post("/user", async (req, res) => {
  const { username, password, access } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const results = await getUserTable().insert({
      username,
      password: hashedPassword,
      access,
    });
    return res.status(200).send(results);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//EDIT USER
authRoute.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password, access } = req.body;

  // console.log(access);
  // let hashedPassword = password;
  // if (password) {
  //   hashedPassword = await bcrypt.hash(password, 10);
  // }

  try {
    const userTable = getUserTable();

    const user = await userTable.where({ id }).first();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const updatedUser = {
      username: username || user.username,
      // password: password ? hashedPassword : user.password,
      access: access || user.access,
    };

    await userTable.where({ id }).update(updatedUser);
    return res.status(200).send({ message: "User updated successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//CHANGE PASSWORD
authRoute.put("/password/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  let hashedPassword = password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    const userTable = getUserTable();
    const user = await userTable.where({ id }).first();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const updatedUser = {
      password: password ? hashedPassword : user.password,
    };

    await userTable.where({ id }).update(updatedUser);
    return res.status(200).send({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//DELETE USER
authRoute.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userTable = getUserTable();

    const user = await userTable.where({ id }).first();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await userTable.where({ id }).del();
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//LOGIN
authRoute.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserTable().where({ username }).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json("Невалидни данни!");
    }

    const accessToken = jwt.sign(
      {
        username,
        access: user.access,
      },
      secret,
      {
        expiresIn: "8h",
      }
    );
    return res.status(200).send({
      username,
      access: user.access,
      token: accessToken,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//VERIFY TOKEN
authRoute.post("/verify", async (req, res) => {
  const { token, access } = req.body;
  try {
    jwt.verify(token, secret, (err, { username, access }) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
    });

    return res.status(200).send("OK");
  } catch (err) {
    return res.status(403).send({ message: err.message });
  }
});

export default authRoute;

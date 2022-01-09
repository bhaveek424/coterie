import { Request, Response, Router } from "express";
import { isEmpty, validate } from "class-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import User from "../entities/User";
import auth from "../middleware/auth";

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // Validate data
    let errors: any = {};
    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });

    if (emailUser) errors.email = "Email is already taken";
    if (usernameUser) errors.username = "Username is already taken";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // Create the user
    const user = new User({ email, username, password });

    errors = await validate(user);
    if (errors.length > 0) return res.status(400).json({ errors });

    await user.save();

    // Return the user
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(username)) errors.username = "Username can't be empty";
    if (isEmpty(password)) errors.password = "Password can't be empty";
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ password: "Password is incorrect" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        // making httpOnly means that it can not be accessed by Js which makes it more secure
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res.json(user);
  } catch (err) {}
};

// user can send the request to this route and it will tell the user if they are authenticated
//so it will take the token and send back the user data
const me = (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

const logout = (_: Request, res: Response) => {
  // we can't just actually tell the client to delete the cookie that doesnt
  // instead set a cookie with exact same name of the cookie and give it an empty value. give it an immidiate expiry time so browser deletes it
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );

  return res.status(200).json({ success: true });
};

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me); // if anything in auth fails, we will not reach here
router.get("/logout", auth, logout);

export default router;

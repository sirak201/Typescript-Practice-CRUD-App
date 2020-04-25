import { Router, Response, Request } from "express";

import {
  UserModel,
  UserInterface,
  validatePasswords,
  hashPassword,
  SignIn,
} from "../Models/userModel";

const router: Router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const newUser: UserInterface = req.body;

  newUser.checkPassword = validatePasswords;
  newUser.hashPassword = hashPassword;
  if (!newUser.checkPassword(newUser.password, newUser.conformPassword)) {
    res.status(400).send({ error: "Password does not match" });
    return;
  }

  try {
    newUser.password = await newUser.hashPassword(newUser.password);

    const newUserModel = new UserModel(newUser);
    const addeduser = await newUserModel.save();

    res.send(addeduser);
  } catch (err) {
    res.send({ error: err });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email == undefined || password == undefined) {
    res
      .status(404)
      .send({ error: "Did not provide all the right crudentials" });
    return;
  }

  const signInDate: SignIn = new SignIn(email, password);
  try {
    const user = await signInDate.findUserByEmail();
    if (user === null) {
      res
        .status(404)
        .send({ error: "Did not provide all the right crudentials" });
      return;
    }
    if (await signInDate.compareHashPassword(user.password)) {
      res.send("Login was sucessfull");
      return;
    }

    res.status(404).send({ error: "Log In crudentials do not match" });
  } catch (err) {
    res.send({ error: err });
  }
});

export { router as UserRoute };

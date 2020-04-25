import { Router, Response, Request } from "express";
import {
  UserModel,
  UserInterface,
  validatePasswords,
  hashPassword,
} from "../Models/userModel";

const router: Router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const newUser: UserInterface = req.body;

  newUser.checkPassword = validatePasswords;
  newUser.hashPassword = hashPassword;
  if (!newUser.checkPassword(newUser.password, newUser.conformPassword)) {
    res.status(400).send({ error: "Password does not match" });
  }

  try {
    newUser.password = await newUser.hashPassword(newUser.password);

    const newUserModel = new UserModel(newUser);
    const addeduser = await newUserModel.save();
    res.send(addeduser);
  } catch (err) {
    res.send(err);
  }
});

export { router as UserRoute };

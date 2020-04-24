import { Router, Request, Response } from "express";
import { TModel, TodoModel } from "../Models/todoModel";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const todo: TModel = req.body;

  const newTodo = new TodoModel(todo);

  try {
    const finalTodo = await newTodo.save();
    res.status(200).send(finalTodo);
  } catch (err) {
    res.status(400).send({ error: err.errors.owner.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).send(todos);
  } catch (err) {}
});

export { router as TodoRoute };

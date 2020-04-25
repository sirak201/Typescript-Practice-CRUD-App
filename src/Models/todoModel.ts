import { model, Schema, Model, Document } from "mongoose";
interface TodoInterface extends Document {
  todo: string;
  date: string;
  owner: string;
}

const TodoSchema: Schema = new Schema({
  todo: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  owner: {
    type: String,
    required: true,
  },
});

var TodoModel: Model<TodoInterface> = model<TodoInterface>("Todo", TodoSchema);

export { TodoModel, TodoInterface };

import { model, Schema, Model, Document } from "mongoose";
interface TModel extends Document {
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

var TodoModel: Model<TModel> = model<TModel>("Todo", TodoSchema);

export { TodoModel, TModel };

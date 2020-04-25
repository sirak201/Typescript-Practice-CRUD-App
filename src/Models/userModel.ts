import { Document, Schema, model, Model } from "mongoose";
import * as bcrypt from "bcrypt";

interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  conformPassword: string;
  checkPassword(password: string, conformPassword: string): boolean;
  hashPassword(password: string): Promise<string>;
}

class SignIn {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async compareHashPassword(hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(this.password, hashPassword);
  }

  async findUserByEmail(): Promise<UserInterface> {
    try {
      return await UserModel.findOne({ email: this.email });
    } catch (err) {
      throw err;
    }
  }
}

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

function validatePasswords(password: string, conformPassword: string): boolean {
  if (password === conformPassword) {
    return true;
  }

  return false;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: String,
    unique: true,
    min: 3,
    max: 30,
  },
  password: {
    type: String,
    required: String,
    min: 6,
    max: 30,
  },

  email: {
    type: String,
    required: String,
    unique: true,
  },
});

var UserModel: Model<UserInterface> = model("User", userSchema);

export { UserInterface, UserModel, validatePasswords, hashPassword, SignIn };

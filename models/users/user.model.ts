import { Schema, model, Document, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

interface UserInterface extends Document {
  name: string;
  email: string;
  contact: string;
  dateOfBirth: Date;
  image: string;
  instagram: string;
}

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  instagram: {
    type: String,
    default: "",
  },
});

UserSchema.plugin(paginate);

const UserModel = model<UserInterface, PaginateModel<UserInterface>>(
  "UserModel",
  UserSchema,
);

export default UserModel;

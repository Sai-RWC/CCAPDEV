import { Schema, SchemaTypes, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
    minlength: 3,
    // validate: {
    //   validator: v => v.test(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/),
    //   message: props => `${props.value} `
    // }
    // TODO: add username validator to only contain alphanumeric characters
  },
  about: {
    type: SchemaTypes.String,
    minlength: 1
  },
  password: {
    type: SchemaTypes.String,
    required: true,
    minlength: 5
  },
  imagePath: {
    type: SchemaTypes.String
  }
});


export const User = model("user", userSchema);

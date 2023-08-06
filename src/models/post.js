import { Schema, SchemaTypes, model } from "mongoose";

const postSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  },
  message: {
    type: SchemaTypes.String,
    required: true,
    validate: {
      validator: (v) => {
        return v.length > 1
      },
        message: 'You must provide a message'
    }
  },
  datecreated: {
    type: SchemaTypes.Date,
    required: true,
    immutable: true
  },
  reaction: {
    type: SchemaTypes.Decimal128,
    default: 0
  },
  numComments: {
    type: SchemaTypes.Decimal128,
    default: 0
  }

});

export const Post = model("post", postSchema);

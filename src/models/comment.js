import { Schema, SchemaTypes, model } from "mongoose";

const commentSchema = new Schema({
  user: {
    // who made the comment
    type: SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  },
  postid: {
    // to whose post did the commenter comment
    type: SchemaTypes.ObjectId,
    ref: 'post',
    required: true
  },
  message: {
    type: SchemaTypes.String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 1
      },
        message: 'You must provide a message'
    }
  }
});

export const Comment = model("comment", commentSchema);

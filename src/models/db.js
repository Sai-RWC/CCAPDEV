import mongoose from "mongoose";

export const connect = () => {
  return mongoose.connect(process.env.MONGODB_URI);
}

// implement this
// https://stackoverflow.com/questions/60740168/nodejs-mongoose-required-field-validation

import { InferSchemaType, model, Schema } from "mongoose";

type Note = InferSchemaType<typeof noteSchema>;

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model<Note>("Note", noteSchema);

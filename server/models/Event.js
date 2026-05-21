import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    host: {
      type: String,
      required: true
    },

    eventHead: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    description: {
      type: String
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Event", eventSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String
    },

    designation: {
      type: String,
      default: "Member"
    },

    role: {
      type: String,
      enum: ["member", "admin", "local"],
      default: "member"
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
import mongoose from "mongoose";

const AdminRequestSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.models.AdminRequest ||
  mongoose.model("AdminRequest", AdminRequestSchema);

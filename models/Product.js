import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  action: String,
  admin: String,
  message: String,
  details: mongoose.Schema.Types.Mixed,
  at : {
    type: Date,
    default: Date.now,
  },
});

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    stock: Number,

    status: {
      type: String,
      enum: ["Active", "Draft", "Out of Stock"],
      default: "Draft",
    },

    imageUrl: String,
    description: String,

    editedBy: String,

    logs: [LogSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

// models/settingsModel.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "Forever Footwear" },
    currency: { type: String, default: "$" },
    maintenanceMode: { type: Boolean, default: false },
    logo: String,
    favicon: String,
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    contactInfo: {
      email: String,
      phone: String,
      address: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);

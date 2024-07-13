import mongoose from "mongoose";

import { Schema } from "mongoose";

const pageSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Page || mongoose.model("Page", pageSchema);

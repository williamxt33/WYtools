import mongoose, { Schema, Document } from "mongoose";

export interface IRecent extends Document {
  userId: mongoose.Types.ObjectId;
  toolId: string;
  usedAt: Date;
}

const RecentSchema = new Schema<IRecent>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  toolId: { type: String, required: true },
  usedAt: { type: Date, default: Date.now },
});

RecentSchema.index({ userId: 1, usedAt: -1 });

const Recent =
  mongoose.models.Recent || mongoose.model<IRecent>("Recent", RecentSchema);

export default Recent;

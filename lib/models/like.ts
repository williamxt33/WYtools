import mongoose, { Schema, Document } from "mongoose";

export interface ILike extends Document {
  userId: mongoose.Types.ObjectId;
  toolId: string;
  createdAt: Date;
}

const LikeSchema = new Schema<ILike>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  toolId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

LikeSchema.index({ userId: 1, toolId: 1 }, { unique: true });

const Like = mongoose.models.Like || mongoose.model<ILike>("Like", LikeSchema);

export default Like;

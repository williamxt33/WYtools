import mongoose, {Schema, Document} from "mongoose"

export interface Iuser extends Document{
  name: string
  email: string
  passwordHash: string
  createAt: Date
}

const UserSchema = new Schema<Iuser>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  passwordHash: {type: String, required: true},
  createAt: {type: Date, default: Date.now()}
})

const User = mongoose.models.Iuser || mongoose.model<Iuser>("User", UserSchema)

export default User
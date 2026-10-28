import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const user = new mongoose.Schema({
    name:{ type:String, required:true, trim: true},
    email:{ type:String, required: true, lowercase: true, unique: true },
    isEmailverified:{ type: Boolean, default: false},
    telephone:{ type: Number, unique: true, required: true},
    isTelephoneVerified: { type: Boolean, default: false},
    password: { type:String, required: true, select: false},
    role:{ type: String, required: true, enum: ["admin", "security", "visitor","employee"], default:"visitor"},
    profilePhoto:{ type: String, default:""},
    isActive:{ type: Boolean, default:true}
},
{
    timestamps: true
});

user.pre("save", async function(next) {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password ,10);
});

export const userModel = mongoose.model("user", user);
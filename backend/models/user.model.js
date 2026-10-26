const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const user = new mongoose.Schema({
    name:{ type:String, required:true, trim: true},
    email:{ type:String, required: true, lowercase: true, unique: true },
    password: { type:String, required: true, select: false},
    role:{ type: String, required: true, enum: ["admin", "security", "visitor","employee"], default:"visitor"},
    profilePhoto:{ type: String, default:""},
    isActive:{ type: Boolean, default:true}
},
{
    timestamps: true
});

user.pre("save", function() {
    if(!this.isModified) return;
    this.password = bcrypt.hash(this.password ,10);
})

export const userModel = mongoose.model("user", user);
import mongoose from 'mongoose';

const visitor = new mongoose.Schema({
    fullName:{ type: String, required:true},
    telephome: { type: Number, required: [true,"telephone is required"]},
    photo: { type: String, default: " "},
    age:{ type:Number, required: true},
    gender:{ type: String, required: true, enum:["male","female","other"]},
    date:{ type: Date, required: true},
    email:{ type:String, required: true},
    idProofType:{type:String, required:true},
    idProofNumber:{type: Number, required:true},
    purpose:{ type: String, required:true},
    host:{ type:mongoose.Schema.Types.ObjectId, ref:"user", required: true}
},{
    timestamps:true
});
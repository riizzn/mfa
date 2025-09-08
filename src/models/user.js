import { Schema } from "mongoose";
const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isMfaActive:{type:Boolean , required:false},
  twoFactorSecret:{
    type:String,
  },
  
},
{
    timestamps:true,
  });

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { exitCode } from "process";

const userSchema = new mongoose.Schema ({
    username :{ type: String, require: true , unique: true},
    email : { type: String, require: true , unique: true},
    password : { type: String, require: true},
})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();{
        const salt = await bcrypt.genSalt(10);
        if (this.password) {
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    }
})

export default mongoose.model("User", userSchema);
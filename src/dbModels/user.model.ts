import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

export interface LoginUserInput {
    uid: string,
    pwd: string
}

export interface CreateUserInput {
    uid: string,
    name: string,
    pwd: string
}

export interface UserDocument extends CreateUserInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: string):Promise<boolean>
}

const userSchema = new mongoose.Schema({
    uid: {type: String, ddd: true, unique: true},
    name: {type: String, require: true},
    pwd: {type: String, require: true}
})

userSchema.pre("save", async function(next){
    const user = this as UserDocument

    if(!user.isModified("pwd"))
        next()

    // user password is modified or newly created, re-hash the password
    const salt = await bcrypt.genSalt(config.get<number>("saltRounds"))
    const hash = await bcrypt.hash(user.pwd, salt)
    user.pwd = hash
    next()
})

userSchema.methods.comparePassword = async function(candidatePassword: string){
    const user = this as UserDocument

    const isEqual = await bcrypt.compare(candidatePassword, user.pwd).catch(() => false)
    return isEqual
}

const userModel = mongoose.model<UserDocument>("user",userSchema)

export default userModel
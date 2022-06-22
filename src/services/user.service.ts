import userModel, { CreateUserInput, LoginUserInput, UserDocument } from "../dbModels/user.model"
import {omit} from "lodash"

const createUser = async (userInput: CreateUserInput) => {
    try{
        const user = await userModel.create(userInput)
        return omit(user.toJSON(), "pwd")
    }catch(err: any){
            throw new Error(err)
    }
}

const loginUser = async (userInput:LoginUserInput) => {
    try{
        //find user
        const user = await userModel.findOne({uid: userInput.uid}).exec()
        if (!user) throw new Error("User not found")

        //validate password
        const isPwdValid = await user.comparePassword(userInput.pwd)
        if(!isPwdValid) throw new Error("Password Incorrect")

        return omit(user.toJSON(), "pwd")

    }catch(err){
        throw new Error("Incorrect username or password")
    }
}

export {createUser, loginUser}
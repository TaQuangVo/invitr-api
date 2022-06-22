import { Request, Response } from "express";
import { createUser, loginUser } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config"

const registerUserHandler = async (req:Request, res:Response) =>  {
    try{
        //create user
        const user = await createUser(req.body)

        //isues access token
        const accessToken = signJwt(user,{expiresIn: config.get("accessTokenTtl")})

        //isues refresh token
        const refreshToken = signJwt(user,{expiresIn: config.get("refreshTokenTtl")})

        return res.status(201).json({
            success: true,
            data: {
                user,
                accessToken,
                refreshToken
            }
        })
    }catch (err:any) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const loginUserHandler = async (req: Request, res: Response) => {
    
    try{
        //verity username and password
        const user = await loginUser(req.body)

        //isues access token
        const accessToken = signJwt(user,{expiresIn: config.get("accessTokenTtl")})

        //isues refresh token
        const refreshToken = signJwt(user,{expiresIn: config.get("refreshTokenTtl")})

        return res.status(201).json({
            success: true,
            data: {
                user,
                accessToken,
                refreshToken
            }
        })
    }catch (err:any) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

export {registerUserHandler, loginUserHandler}
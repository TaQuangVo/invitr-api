import jwt from "jsonwebtoken"
import path from "path"
import fs from "fs"

const publicKeyPath = path.join(__dirname, "../..", "/id_rsa_pub.pem")
const privateKeyPath = path.join(__dirname, "../..", "/id_rsa_priv.pem")

const PRIV_KEY = fs.readFileSync(privateKeyPath, "utf8");
const PUB_KEY = fs.readFileSync(publicKeyPath, "utf8");


const signJwt = (object:Object, options?:jwt.SignOptions) => {
    const token = jwt.sign(object, PRIV_KEY,{
        ...(options && options),
        algorithm: "RS256"
    })

    return `Bearer ${token}`
}

const verityJwt = (token: string) => {
    try{
        const decoded = jwt.verify(token, PUB_KEY)

        return {
            valid: true,
            expired: false,
            decoded
        }
    }catch (err:any){
        return {
            valid:false,
            expired: err.message === "jwt expired",
            decoded: null
        }
    }
}

export {signJwt, verityJwt}
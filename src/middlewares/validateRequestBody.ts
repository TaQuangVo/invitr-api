import { Request, Response, NextFunction } from "express"
import { AnyZodObject } from "zod"

function validateRequestBody(objSchema:AnyZodObject) {
    return function (req: Request, res: Response, next: NextFunction) {
        try{
            objSchema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            })
            next()
        }catch(err){
            return res.status(400).json({
                success: false,
                message: "Invalid request body",
            })
        }
    }
}


export default validateRequestBody
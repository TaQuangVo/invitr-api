import { object, string } from "zod";


export const registerUserSchema = object({
    body: object({
        uid: string({
            required_error: "Username is required"
        }),
        name: string({
            required_error: "Full name is requred"
        }),
        pwd: string({
            required_error: "Password is requred"
        })
        .min(6,"Password is to short, minimum of 6 charactors is required")
    })
})

export const loginUserSchema = object({
    body:object({
        uid: string({
            required_error: "Username is required"
        }),
        pwd: string({
            required_error: "Password is required"
        }).min(6, "Password is tho short, minimun of 6 charactors")
    })
})
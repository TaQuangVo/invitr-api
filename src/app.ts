import express,{Request, Response} from "express"
import config from "config"
import apiRoutes from "./routes"
import logger from "./utils/logger"
import connect from "./utils/dbConnect"

const app = express()

app.use(express.json())

app.get("/healthcheck", (req:Request, res:Response) => res.status(200).send("server is running"))
app.use("/api", apiRoutes)

const serverPort = config.get<number>("server_port")
app.listen(serverPort, () => {
    logger.info(`Server listen on port ${serverPort}`)
    connect()
})
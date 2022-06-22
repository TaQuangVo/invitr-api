import mongoose from "mongoose"
import config from "config"
import logger from "./logger"

const connect = async () => {
    const dbUri = config.get<string>("dbUri")

    try{
        mongoose.connect(dbUri)
        logger.info("Connected to DB")
    }catch(err){
        logger.error("Cound not connect to DB")
        logger.error(err)
        process.exit(1)
    }
}

export default connect
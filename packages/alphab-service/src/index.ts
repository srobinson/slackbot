/* tslint:disable:no-any */
import {logger} from "@alphab/logging"
import {jsonifyError} from "@alphab/utils"
import {slackClient} from "./bot"
import "./config"

process.on("unhandledRejection", error => {
  logger.error({unhandledRejection: jsonifyError(error)})
})

process.on("SIGINT", function() {
  process.exit()
})

slackClient.start()

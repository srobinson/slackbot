/* tslint:disable:no-any */
import {logger} from "@alphab/logging"
import {jsonifyError} from "@alphab/utils"
import {slackClient} from "./bot"
import "./config"

slackClient.start()

process.on("unhandledRejection", error => {
  logger.error({unhandledRejection: jsonifyError(error)})
})

process.on("SIGINT", function() {
  process.exit()
})

slackClient.on("authenticated", (info: any) => {
  console.log("info", info)

  global["slackBot"] = info.self.id
  console.log(`Logged in as ${info.self.name} of team ${info.team.name}`)
})

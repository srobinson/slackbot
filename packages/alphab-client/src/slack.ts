import {RTMClient, LogLevel} from "@slack/client"
import "./config"

const SLACK_TOKEN = process.env.SLACK_TOKEN || "na"
const SLACK_LOG_LEVEL = process.env.SLACK_LOG_LEVEL || "VERBOSE"

export const slackClient = new RTMClient(SLACK_TOKEN, {
  logLevel: LogLevel[SLACK_LOG_LEVEL],
})

/* tslint:disable:no-any */
import * as fs from "fs"
import * as path from "path"
import {askWit, slackClient} from "@alphab/client"

slackClient.on("authenticated", (info: any) => {
  global["slackBot"] = info.self.id
  console.log(`Logged in as ${info.self.name} of team ${info.team.name}`)
})

slackClient.on("message", async (msg: any) => {
  const botRegex = new RegExp(global["slackBot"])
  const msgRegex = new RegExp(/^alf[\.\,\s\!]{1}/i)
  const isBot = msg.text.match(botRegex) || msg.text.match(msgRegex)

  if (isBot) {
    const res = await askWit(msg.text)

    if (res.intent) {
      const intent = res.intent[0]
      const intentPath = path.resolve(__dirname, `intents/${intent.value}.ts`)

      if (fs.existsSync(intentPath)) {
        try {
          await slackClient.sendTyping(msg.channel)
          const answer = await require(`./intents/${intent.value}.ts`).default(msg, res)
          await slackClient.sendMessage(answer, msg.channel)
        } catch (e) {
          // no-op
          await slackClient.sendMessage("I'm sorry", msg.channel)
          console.log(e)
        }
      }
    }
  }
})

export {slackClient}

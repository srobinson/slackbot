/* tslint:disable:no-any */
import * as fs from "fs"
import * as path from "path"
import {slackClient} from "@alphab/client"
import ask from "@alphab/wit-client"

slackClient.on("message", async (msg: any) => {
  const regex = new RegExp(global["slackBot"])
  const isBot = msg.text.match(regex) || msg.text.match(/^alf[\.\,\s\!]{1}/i)

  if (isBot) {
    const res = await ask(msg.text)
    if (res.intent) {
      const intent = res.intent[0]

      const intentPath = path.resolve(__dirname, `intents/${intent.value}.ts`)
      if (fs.existsSync(intentPath)) {
        try {
          const answer = await require(`./intents/${intent.value}.ts`).default(res)
          if (answer) {
            slackClient.sendMessage(answer, msg.channel)
          }
        } catch (e) {
          // no-op
          console.log(e)
        }
      }
    }
  }
})

export {slackClient}

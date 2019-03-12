/* tslint:disable:no-any */
import * as request from "superagent"
import "./config"

const WIT_TOKEN = process.env.WIT_TOKEN || "na"
const WIT_URL = process.env.WIT_URL || "https://api.wit.ai/message"
const WIT_V_PARAM = process.env.WIT_V_PARAM
const ask = async (message: string) => {
  return request
    .get(WIT_URL)
    .set("Authorization", "Bearer " + WIT_TOKEN)
    .query({v: WIT_V_PARAM})
    .query({q: message})
    .then(res => {
      return res.body.entities
    })
}

export default ask

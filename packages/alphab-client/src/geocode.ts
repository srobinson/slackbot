import * as request from "superagent"
import "./config"

const LOCATIONIQ_API = process.env.LOCATIONIQ_API
const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY

export const geocode = async (region: string) => {
  const url = `${LOCATIONIQ_API}?key=${LOCATIONIQ_API_KEY}&q=${region}&format=json`
  const response = await request.get(url)
  const location = response.body[0]
  return location
}

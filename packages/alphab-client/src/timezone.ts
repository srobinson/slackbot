import * as request from "superagent"
import * as moment from "moment"
import "./config"

const TIMEZONE_API = process.env.TIMEZONE_API
const TIMEZONE_API_KEY = process.env.TIMEZONE_API_KEY

// https://timezonedb.com/references/get-time-zone

export const timezone = async (geo: GEO_LOC) => {
  const timestamp = +moment().format("X")
  const url = `${TIMEZONE_API}?format=json&by=position&lat=${geo.lat}&lng=${
    geo.lng
  }&time=${timestamp}&key=${TIMEZONE_API_KEY}`
  const response = await request.get(url)
  const result = response.body
  return result
}

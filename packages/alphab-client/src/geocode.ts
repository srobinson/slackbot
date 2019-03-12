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

export const formatRegionName = (region: string) => {
  // example region:
  // 1, "Cyprus"
  // 2, "Ko Samui, Surat Thani Province, 84320, Thailand"
  const parts = region.split(",")
  const shortRegion = [parts[0].trim()]
  if (parts.length > 1) {
    shortRegion.push(parts[parts.length - 1].trim())
  }
  return shortRegion.join(", ")
}

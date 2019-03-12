/* tslint:disable:no-any */
import {geocode, timezone} from "@alphab/client"
import {timeFromTimeStamp} from "@alphab/utils"

const intent = async (msg: any, data: any) => {
  if (!data.location) {
    const time = timeFromTimeStamp(msg.ts)
    return `The time is ${time}`
  }

  const searchRegion = data.location[0].value
  const coords = await geocode(searchRegion)

  // example display_name:
  // 1, "Cyprus"
  // 2, "Ko Samui, Surat Thani Province, 84320, Thailand"
  const parts = coords.display_name.split(",")
  const shortRegion = [parts[0]]
  if (parts.length > 1) {
    shortRegion.push(parts[parts.length - 1])
  }

  const region = shortRegion.join(", ")

  const date = await timezone({
    lat: coords.lat,
    lng: coords.lon,
  })

  const time = timeFromTimeStamp(date.timestamp)

  return `The time in ${region} is ${time}`
}

export default intent

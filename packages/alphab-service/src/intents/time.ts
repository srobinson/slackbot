/* tslint:disable:no-any */
import {formatRegionName, geocode, timezone} from "@alphab/client"
import {timeFromTimeStamp} from "@alphab/utils"

const intent = async (msg: any, data: any) => {
  if (!data.location) {
    const time = timeFromTimeStamp(msg.ts)
    return `The time is ${time}`
  }
  const searchRegion = data.location[0].value
  const location = await geocode(searchRegion)
  const region = formatRegionName(location.display_name)
  const date = await timezone({
    lat: location.lat,
    lng: location.lon,
  })
  const time = timeFromTimeStamp(date.timestamp)

  return `The time in ${region} is ${time}`
}

export default intent

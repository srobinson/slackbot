/* tslint:disable:no-any */
import {timezone} from "@alphab/client"

const intent = async (data: any) => {
  if (!(data.location && data.location[0].resolved)) {
    return `Sorry, I'm afraid I can't tell the time for that location`
  }

  const location = data.location[0].resolved.values[0]
  const time = await timezone({
    lat: location.coords.lat,
    lng: location.coords.long,
  })

  return `The time is ${time.formatted} in ${location.name}`
}

export default intent

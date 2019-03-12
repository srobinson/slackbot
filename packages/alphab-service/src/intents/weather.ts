/* tslint:disable:no-any */
import {formatRegionName, formatWeather, geocode, weather} from "@alphab/client"

const intent = async (msg: any, data: any) => {
  if (!data.location) {
    return "Sorry, for what location would you like to know the weather?"
  }
  const searchRegion = data.location[0].value
  const coords = await geocode(searchRegion)
  const region = formatRegionName(coords.display_name)
  const response = await weather(region)
  return formatWeather(response, region)
}

export default intent

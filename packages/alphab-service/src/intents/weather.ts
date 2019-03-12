/* tslint:disable:no-any */
import {formatRegionName, formatWeather, geocode, weather} from "@alphab/client"

const intent = async (_: any, data: any) => {
  if (!data.location) {
    return "Sorry, for what location would you like to know the weather?"
  }
  const searchRegion = data.location[0].value
  const location = await geocode(searchRegion)
  const response = await weather(location)
  const formatedRegion = formatRegionName(location.display_name)
  return formatWeather(response, formatedRegion)
}

export default intent

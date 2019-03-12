/* tslint:disable:no-any */
import * as request from "superagent"
import {formatRegionName} from "./geocode"
import "./config"

const OPENWEATHERMAP_API = process.env.OPENWEATHERMAP_API
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY

export const weather = async (location: any) => {
  const url = `${OPENWEATHERMAP_API}?APPID=${OPENWEATHERMAP_API_KEY}&lat=${location.lat}&lon=${
    location.lon
  }&units=metric`
  try {
    const response = await request.get(url)
    return response.body
  } catch (e) {
    console.log(e)
    const formattedRegion = formatRegionName(location.region_name)
    throw new Error(`Sorry, I cannot find weather for ${formattedRegion}`)
  }
}

export const formatWeather = (data: any, region: string) => {
  const description = data.weather[0].description
  const temp = data.main.temp
  return `${region} is ${temp}℃ with ${description}`
}

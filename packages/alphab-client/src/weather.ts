/* tslint:disable:no-any */
import * as request from "superagent"
import "./config"

const OPENWEATHERMAP_API = process.env.OPENWEATHERMAP_API
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY

export const weather = async (region: string) => {
  region = region.replace(/\s/g, "")
  const url = `${OPENWEATHERMAP_API}?APPID=${OPENWEATHERMAP_API_KEY}&q=${region}&units=metric`
  const response = await request.get(url)
  return response.body
}

export const formatWeather = (data: any, region: string) => {
  const description = data.weather[0].description
  const temp = data.main.temp
  return `${region} is ${temp}℃ with ${description}`
}

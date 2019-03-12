import * as moment from "moment"

export const timeFromTimeStamp = (ts: number) => moment(ts * 1000).format("LT")

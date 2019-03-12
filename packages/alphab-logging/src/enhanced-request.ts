import {Request, Response, NextFunction} from "express"
import * as uuid from "uuid"
import {ApiLogger} from "./api-logger"

export const enhanceRequestMiddleware = (req: Request, _: Response, next: NextFunction) => {
  req.requestId = uuid.v1().substr(0, 8)
  req.logger = new ApiLogger(req)
  next()
}

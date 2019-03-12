import {ExpressError} from "@alphab/domain"
import {ApiLogger} from "./api-logger"

declare global {
  namespace Express {
    interface Request {
      logger: ApiLogger
      error?: ExpressError | object
      requestId: string
    }
  }
}

import {Request, NextFunction, Response} from "express"
import {logger} from "./logger"
import {jsonifyError} from "@alphab/utils"

const getLoggerForStatusCode = (statusCode: number) => {
  if (statusCode >= 500) {
    return logger.error.bind(logger)
  }
  if (statusCode >= 400) {
    return logger.warn.bind(logger)
  }
  return logger.info.bind(logger)
}

export const generateInfoMessage = (req: Request) => ({
  request: {
    method: req.method,
    requestId: req.requestId,
    url: req.originalUrl,
    userAgent: req.headers["user-agent"],
  },
})

// tslint:disable:object-literal-sort-keys
export const logRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(generateInfoMessage(req))

  const cleanup = () => {
    res.removeListener("finish", logFn)
    res.removeListener("close", abortFn)
    res.removeListener("error", errorFn)
  }

  const logFn = () => {
    cleanup()
    const message = {
      response: {
        requestId: req.requestId,
        url: req.originalUrl,
        status: res.statusCode,
        message: res.statusMessage,
        length: res.get("Content-Length") || 0,
      },
    }
    if (req.error) {
      Object.assign(message, {
        error: req.error,
      })
    }
    getLoggerForStatusCode(res.statusCode)(message)
  }

  const abortFn = () => {
    cleanup()
    logger.warn("Request aborted by the client")
  }

  // tslint:disable-next-line:no-any
  const errorFn = (err: any) => {
    cleanup()
    logger.error(`Request pipeline error: ${jsonifyError(err)}`)
  }

  res.on("finish", logFn) // successful pipeline (regardless of its response)
  res.on("close", abortFn) // aborted pipeline
  res.on("error", errorFn) // pipeline internal error

  next()
}

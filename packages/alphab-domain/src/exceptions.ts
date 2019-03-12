import {Request, Response} from "express"
import {jsonifyError} from "@alphab/utils"

abstract class DomainError extends Error {
  public message: string
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ApiException extends DomainError {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, ApiException.prototype)
  }
}

export class InternalException extends DomainError {
  error: Error
  requestId?: string
  constructor(error: Error) {
    super(error.message)
    this.error = jsonifyError(error)
    Object.setPrototypeOf(this, InternalException.prototype)
  }
}

export class ResourceNotFoundException extends DomainError {
  constructor(req: Request, res: Response) {
    super(`Resource ${req.originalUrl} was not found.`)
    res.status(404)
    Object.setPrototypeOf(this, ResourceNotFoundException.prototype)
  }
}

export interface ExpressError {
  error: object
  statusCode: number
}

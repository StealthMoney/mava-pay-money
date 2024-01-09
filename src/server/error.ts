export class ServerError extends Error {
  status: number
  constructor(message: string, status: number) {
      super(message)
      this.status = status
  }
}

export class NotFoundError extends ServerError {
  constructor(message: string) {
      super(message, 404)
  }
}

export class BadRequestError extends ServerError {
  constructor(message: string) {
      super(message, 400)
  }
}

export class UnauthorizedError extends ServerError {
  constructor(message: string) {
      super(message, 401)
  }
}

export class ForbiddenError extends ServerError {
  constructor(message: string) {
      super(message, 403)
  }
}

export class InternalServerError extends ServerError {
  constructor(message: string) {
      super(message, 500)
  }
}

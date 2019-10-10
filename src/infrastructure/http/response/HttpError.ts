export class HttpError extends Error {
  public statusCode: number
  public body: {}
  public error: Error

  constructor(statusCode: number, body: {}, error?: any) {
    super()
    this.statusCode = statusCode
    this.body = { message: body }
    this.error = error
  }

  public build(statusCode: number, message: string, error?: any) {
    return new HttpError(statusCode, message, error)
  }
}

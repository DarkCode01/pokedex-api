interface IProps {
  status: number,
  msg: string,
  error?: any
}

export class ErrorHandler extends Error {
  public statusCode: number
  public body: {}
  public error: Error

  constructor(statusCode: number, body: {}, error?: any) {
    super()
    this.statusCode = statusCode
    this.body = { message: body }
    this.error = error
  }

  public build({ status, msg, error }: IProps) {
    return new ErrorHandler(status, msg, error)
  }
}

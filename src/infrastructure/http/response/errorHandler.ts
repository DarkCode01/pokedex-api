interface IProps {
  status: number,
  msg: string,
  error?: any
}

export class ErrorHandler extends Error {
  public statusCode: number
  public message: string
  public error: Error

  constructor(statusCode: number, message: string, error?: any) {
    super()
    this.statusCode = statusCode
    this.message = message
    this.error = error
  }

  public build({ status, msg, error }: IProps) {
    return new ErrorHandler(status, msg, error)
  }
}

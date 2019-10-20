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

  public build = async ({ status, msg, error }: IProps) =>
    new ErrorHandler(status, msg, error)
}

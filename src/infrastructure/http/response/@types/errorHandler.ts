declare interface errorHandler {
  statusCode: number
  message: string
  error: Error

  build(props: {
    status: number,
    msg: string,
    error?: any
  }): errorHandler
}

export class ResponseHandler implements responseHandler {
  public build(data: string | any, isMsg = true): string | any {
    try {
      if (isMsg) {
        return {
          data: {
            msg: data
          }
        }
      }

      return {
        data
      }
    } catch (e) {
      console.error(e)
    }
  }
}

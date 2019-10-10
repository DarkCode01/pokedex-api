export class ResponseHandler {
  public build(data: string | any, isMsg = true) {
    try {
      if (isMsg) {
        return {
          data: {
            msg: data
          }
        }
      } else {
        return {
          data
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
}

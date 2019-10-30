declare interface responseHandler {
  build(data: string | any, isMsg?: boolean): {
    data: {
      msg: string | any
    }
  } | { data: string | any }
}

declare interface IEmail {
  build(props: {
    to: string,
    subject: string,
    html: string
  }): Promise<string>
}

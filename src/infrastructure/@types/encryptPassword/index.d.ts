declare interface IEncryptPassword {
  (pass: string): string
}

declare interface IcomparePassword {
  (pass: string, encodedPass: string): boolean
}

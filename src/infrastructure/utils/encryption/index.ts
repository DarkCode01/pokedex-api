import bcrypt from 'bcrypt'

const encryptPassword: IEncryptPassword = (pass: string) => bcrypt.hashSync(pass, 10)
const comparePassword: IcomparePassword = (pass: string, encodedPass: string) => bcrypt.compareSync(pass, encodedPass)

export {
  encryptPassword,
  comparePassword
}

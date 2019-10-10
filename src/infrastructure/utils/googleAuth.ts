import { clientId } from '../../../config'
import { OAuth2Client } from 'google-auth-library'
const OAuth2 = new OAuth2Client(clientId)

// Get data from google users
const userGoogle = async (token: string) => {
  const ticket = await OAuth2.verifyIdToken({
    idToken: token,
    audience: <string>clientId
  })
  const user = ticket.getPayload()
  return user && ({
    name: user.given_name,
    surname: user.family_name,
    email: user.email,
    isGoogle: true
  })
}

export default userGoogle

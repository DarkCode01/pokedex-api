/* import request from 'supertest'
import { statusCodes } from '../../infrastructure/http/response'
import { Configuration as config } from 'config/Configuration'
// import { User, UserDTO } from '../user/user.providers'
const api = request.agent(config.test.uri)

/*****************************************************
*  Integration Test of User Actions                  *
******************************************************/
/* const userMock = {
  name: 'Efrain',
  lastname: 'Peralta',
  username: 'usertest',
  email: 'testuser@mail.com',
  password: 'pass2303',
  gender: 'male',
  emailOrUsername: 'usertest',
}

describe('Integration of ExpressJS controllers and routes, Endpoint delivery.', () => {
  it('Create User', async () => {
    const register: any = await api.post('/register')
      .send(userMock)
    expect(register.statusCode).toEqual(statusCodes.CREATE)
    expect(register.body).toHaveProperty('data')
  })

  it('Authenticate user', async () => {
    const auth: any = await api.post('/auth')
      .send(userMock)
    expect(auth.statusCode).toEqual(statusCodes.OK)
    expect(auth.body).toHaveProperty('data')
  })
}) */

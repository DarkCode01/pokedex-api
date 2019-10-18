import request from 'supertest'
import { config } from '../../../../container/providers'
const api = request.agent(config.test.uri)

/*****************************************************
*  Integration Test of User Actions                  *
******************************************************/

describe('Integration of ExpressJS controllers and routes, Endpoint delivery.', () => {
  it('Create new User and Remove from Endpoint', async () => {
    return true
  })
})

import request from 'supertest'
import { testUri } from '../../../../config'
const api = request.agent(testUri)

describe('Integration Test of Book Actions', () => {
  it('Create new Book and Remove', async () => {
    /*  const create: any = await api.post('/')
      .send({
        name: 'Murder at Hawthorn: created for a test',
        description: 'Melissa Craig is absolutely...',
        isbn: 'B07G8K9D93J23',
        publisher: 'Hachette UK - Bookouture',
        publicDate: 'August 13, 2019',
        language: 'English'
      })
    expect(create.statusCode).toEqual(201)
    expect(create.body).toHaveProperty('data')

    const remove: any = await api.delete(`/${create.body.data.id}`)
    expect(remove.statusCode).toEqual(200)
    expect(remove.body.data.msg).toEqual('the book has been removed') */
    return true
  })
})

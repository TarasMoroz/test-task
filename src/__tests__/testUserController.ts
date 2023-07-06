import request from 'supertest'
import { Express } from 'express-serve-static-core'
import { createServer } from '../app'
import { userItemMock, usersListMock } from '../users/mocks/userRepoFake'

let server: Express

beforeAll( async () => {
  server = await createServer(1234);
})

describe('GET /users', () => {
  it('should return 200 & valid object', done => {
    request(server)
      .get(`/users`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject(usersListMock)
        done()
      })
  })
})

describe('GET /users/[id]',  () => {

  it('should return 200 & valid response if user found', done => {
    request(server)
      .get(`/users/${userItemMock._id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject(userItemMock)
        done()
      })
  })

  it('should return 400 & valid error in case of wrong userId', done => {
    request(server)
      .get(`/users/wrong-user-id`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.errorCode).toEqual(1)
        done()
      })
  })

  it('should return 400 & valid error in case of user is not found in repository', done => {
    request(server)
      .get(`/users/648ad57897637be44fd7d6b3`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.errorCode).toEqual(2)
        done()
      })
  })

})
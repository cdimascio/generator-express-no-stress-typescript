import express from 'express';
import controller from './controller'
export default express.Router()
    .post('/', controller.create)
    .get('/', controller.all)
    .get('/:id', controller.byId)
    .post('/user', controller.createUser)
    .get('/user/:id', controller.findUser)

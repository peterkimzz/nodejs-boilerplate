import express from 'express'
import { get } from '../../controllers/v1/users.controller'

const router = express.Router()

router.get('/:uuid?', get)

export default router

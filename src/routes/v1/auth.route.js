import express from 'express'
import {
  login,
  signUp,
  tokenTest
} from '../../controllers/v1/auth.controller.js'

const router = express.Router()

router.post('/login', login)
router.post('/sign_up', signUp)
router.get('/tokenTest', tokenTest)

export default router

import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userRepo from '../../repositories/users.repository'
import response from '../../utils/response'

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await userRepo.findByEmail(email)
    if (!user) return next(createError(404, '사용자를 찾을 수 없습니다.'))

    const match = await bcrypt.compare(password, user.password)
    if (!match) return next(createError(422, '비밀번호를 확인 해주세요.'))

    const payload = {
      email: user.email,
      uuid: user.uuid
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRESIN
    })

    return response(res, { token })
  } catch (e) {
    next(e)
  }
}

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await userRepo.store({ email, password })

    return response(res, { user })
  } catch (err) {
    next(err)
  }
}

const tokenTest = async (req, res, next) => {
  try {
    return response(res, req.user)
  } catch (err) {
    next(err)
  }
}

export { login, signUp, tokenTest }

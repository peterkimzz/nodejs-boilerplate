import jwt from 'jsonwebtoken'
import userRepo from '../repositories/users.repository'

export default async (req, res, next) => {
  try {
    req.auth = null
    let token

    // 쿠키에서 찾기
    if (req.cookies.token) {
      token = req.cookies.token
    }
    // 헤더에서 찾기
    else if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    }
    // 토큰이 없으면 넘기기
    else {
      return next()
    }

    // JWT 해독
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (!payload) {
      console.error('jwt expired', payload)
      return next()
    }

    // UUID로 유저 찾기
    const uuid = payload.uuid
    const user = await userRepo.findByUUID(uuid)
    // 유저가 DB에서 강제로 삭제됐을 때
    if (!user) {
      console.error('\nUserDataForceDeleted\n')
      res.cookie('token', '')
      return next()
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`\njwt middleware:\n`, user.toWeb(), '\n')
    }

    // Globalize
    req.auth = {
      token,
      user: user.toWeb()
    }

    next()
  } catch (err) {
    next(err)
  }
}

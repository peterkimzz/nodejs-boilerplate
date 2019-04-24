import httpStatus from 'http-status'
import createError from 'http-errors'
import userRepo from '../../repositories/users.repository'
import response from '../../utils/response'

const get = async (req, res, next) => {
  try {
    if (req.params.uuid) {
      const user = await userRepo.find(req.params.uuid)

      if (!user) {
        throw createError(httpStatus.NOT_FOUND, '사용자를 찾을 수 없습니다.')
      }

      return response(res, user.toWeb())
    } else {
      const users = await userRepo.all()
      const result = users.map(user => user.toWeb())

      return response(res, result)
    }
  } catch (e) {
    next(e)
  }
}

export { get }

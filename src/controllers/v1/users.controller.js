import { models } from '../../models'

const get = async (req, res, next) => {
  try {
    const users = await models.User.findAll()

    return res.json(users)
  } catch (e) {
    return next(e)
  }
}

export { get }

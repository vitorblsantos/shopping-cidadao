import { Op } from 'sequelize'
import { User } from '../models/'

const create = async (req, res) => {
  const { body } = req
  try {
    const user = await User.create({ ...body })
    return res.status(201).send(user)
  } catch (e) {
    return res.status(500).send(e)
  }
}

const get = async (req, res) => {
  const { email } = req.params
  const { dataValues } = await User.findOne({
    where: {
      email: {
        [Op.eq]: email
      }
    }
  })
  res.status(200).send(dataValues)
}

export default {
  create,
  get
}

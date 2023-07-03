const Users = require('../models/user.model')

class UsersDAO {
  constructor() {}

  async getAll() {
    try {
      return await Users.find()
    } catch (error) {
      throw error
    }
  }

  async getOne(query) {
    try {
      return await Users.findOne(query)
    } catch (error) {
      throw error
    }
  }

  async create(info) {
    try {
      return await Users.create(info)
    } catch (error) {
      throw error
    }
  }

  async deleteAll() {
    try {
      return await Users.deleteMany()
    } catch (error) {
      throw error
    }
  }
}

module.exports = UsersDAO
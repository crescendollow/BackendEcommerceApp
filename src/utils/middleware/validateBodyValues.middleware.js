const UserDTO = require('../../service/users.service')

const validateBodyValues = (...values) => {
  return (req, res, next) => {
    req.user = new UserDTO(req.body)

    const propertiesNotFound = values.filter(
      property => !(req.user.hasOwnProperty(property) && req.user[property])
    )

    if (propertiesNotFound.length > 0) {
      let errors = []
      propertiesNotFound.forEach(property =>
        errors.push(`${property} no se encuentra`)
      )

      return res.status(400).json({ status: 'error', errors })
    }

    next()
  }
}

module.exports = validateBodyValues
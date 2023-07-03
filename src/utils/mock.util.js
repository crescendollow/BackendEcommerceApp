const { faker } = require('@faker-js/faker')

faker.locale = 'es'

const generateUsers = numUsers => {
  const users = []
  for (let i = 0; i < numUsers; i++) {
    users.push(generateUser())
  }
  return users
}

const generateUser = () => {
  const numOfProducts = faker.random.numeric(1, { bannedDigits: ['0'] })

  const products = []
  for (let i = 0; i < numOfProducts; i++) {
    products.push(generateProducts())
  }

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.email(),
    rol: faker.helpers.arrayElement(['user', 'admin','premium']),
    cart: products,
  }
}

const generateProducts = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.random.numeric(2, { bannedDigits: ['0'] }),
    description: faker.lorem.lines(),
    category: faker.category(),
    code: faker.code()
  }
}

module.exports = generateUsers
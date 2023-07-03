const dotenv= require('dotenv')

dotenv.config()

console.log()

module.exports ={
  environment: process.env.NODE_ENV || 'development',
  MONGODBURL: process.env.MONGODBURL,
  PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT,
  REGISTER_STRATEGY: process.env.REGISTER_STRATEGY,
  LOGIN_STRATEGY: process.env.LOGIN_STRATEGY,
  JWT_STRATEGY: process.env.JWT_STRATEGY,
  PORT : process.env.PORT,
  COOKIE_USER: process.env.COOKIE_USER,
  PERCIST:process.env.PERCIST
}
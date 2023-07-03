import chai from 'chai'
import { hashPassword, comparePassword } from '../utils/hashPassword'
const expect = chai.expect

describe('Testing bycrypt', () => {
  const mockUser = {
    firstName: 'Nati',
    lastName: 'Miranda',
    email: 'Nati@Miranda.com',
    password: 'nati246',
  }

  it('The service must hash the password correctly (verifying that hashed password is different form the original)', async function () {
    const result = await hashPassword(mockUser.password)

    expect(result).is.not.equal(mockUser.password)

    const regex =
      /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g
    expect(result).to.match(regex)
  })

  it('Hash needs to do an efective comparison', async function () {
    const passwordHashed = await hashPassword(mockUser.password)

    const newMockUser = {
      firstName: 'Nati',
      lastName: 'Miranda',
      email: 'Nati@Miranda.com',
      password: passwordHashed,
    }

    const result = await comparePassword(newMockUser, mockUser.password)

    expect(result).is.equal(true)
  })

  it('If the hashed password is tampered with, it should fail the original password match.', async function () {
    const passwordHashed =
      '$2b$10$CyqdeKvO4OGuY3cUXtE/7eQ1MJBJzVcOSo1ERAV.51MjkqaCz6nNG'
    const result = await comparePassword(
      { password: passwordHashed },
      mockUser.password
    )
    expect(result).is.equal(false)
  })
})
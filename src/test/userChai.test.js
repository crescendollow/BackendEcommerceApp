import mongoose from "mongoose";
import Users from "../dao/mongoManager/BdUsersManager";
import chai from "chai";

mongoose.connect(
  "mongodb+srv://admin:admin@natimirandacoder.n5k70ef.mongodb.net/?retryWrites=true&w=majority"
);

const expect = chai.expect;

describe("Testear dao de usuarios con CHAI", () => {
  const mockUser = {
    firstName: 'Nati',
    lastName: 'Miranda',
    email: 'Nati@Miranda.com',
    password: 'nati246',
  };

  before(function () {
    this.Users = new Users();
  });

  beforeEach(async function () {
    this.timeout(5000);
    await mongoose.connection.collections.users.deleteMany({});
  });

  it("The DAO should be able to get the users in array format", async function () {
    const result = await this.Users.get();
    expect(result).to.be.deep.equal([]);
  });

  it("The DAO should successfully add an item to the database", async function () {
    const result = await this.Users.save(mockUser);
    expect(result).to.have.property("_id");
  });

  it("The DAO adds an empty cart array by default to the inserted document", async function () {
    const result = await this.Users.save(mockUser);

    expect(result).to.have.property("products").to.be.an("array").that.is.empty;
  });

  it("The DAO can get a user by email", async function () {
    const result = await this.Users.save(mockUser);

    const user = await this.Users.getBy({ email: result.email });

    expect(user).to.have.property("email");
  });

  it("The DAO can update the username", async function () {
    const user = await this.Users.save(mockUser);

    await this.Users.update(user._id, {
      firstName: "Tita",
    });

    const result = await this.Users.getBy({ _id: user._id });

    expect(result.firstName).to.equal("Tita");
  });

  it("The DAO can delte an User", async function () {
    const user = await this.Users.save(mockUser);

    await this.Users.delete(user._id);

    const result = await this.Users.getBy({ email: user.email });

    expect(result).to.be.null;
  });
});

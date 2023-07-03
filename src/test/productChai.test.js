import mongoose from "mongoose";
import Products from "../dao/mongoManager/BdProductManager";
import chai from "chai";

mongoose.connect(
  "mongodb+srv://admin:admin@natimirandacoder.n5k70ef.mongodb.net/?retryWrites=true&w=majority"
);

const expect = chai.expect;

describe("Test Products DAO with CHAI", () => {
  const mockProduct = {
    title: 'Prod',
    description: 'Producto',
    code: '123456789',
    price: 100,
    stock: 100,
    category: 'Car'
  };

  before(function () {
    this.products = new Products();
  });

  beforeEach(async function () {
    this.timeout(5000);
    await mongoose.connection.collections.Products.deleteMany({});
  });

  it("The DAO should be able to get the products in array format", async function () {
    const result = await this.products.get();
    expect(result).to.be.deep.equal([]);
  });

  it("The DAO should successfully add a product to the database", async function () {
    const result = await this.Products.save(mockUser);
    expect(result).to.have.property("_id");
  });

  it("The DAO can get a product by code", async function () {
    const result = await this.Products.save(mockProduct);

    const product = await this.Products.getBy({ code: result.code });

    expect(product).to.have.property("code");
  });

  it("The DAO can update the product", async function () {
    const product = await this.Products.save(mockUser);

    await this.Users.update(user._id, {
      titile: "NewProduct",
    });

    const result = await this.Products.getBy({ _id: product._id });

    expect(result.titile).to.equal("NewProduct");
  });

  it("The DAO can delte a Product", async function () {
    const product = await this.Products.save(mockUser);

    await this.Products.delete(product._id);

    const result = await this.Products.getBy({ code: product.code });

    expect(result).to.be.null;
  });
});
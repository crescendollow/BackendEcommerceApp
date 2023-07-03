class CartService {
  constructor(dao) {
    this.dao = dao;
  }
  getCartsId = (id) => this.dao.getId(id);
  createCart = (carts) => this.dao.create(carts);
  updateToCart = (cid, cart) => this.dao.update({ _id: cid }, cart);
  createTiket = (tiket) => this.dao.crateTiket(tiket);
}

module.exports = CartService;
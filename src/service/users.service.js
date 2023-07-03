class UserService {
  constructor(dao) {
    this.dao = dao;
  }
  getUserId = (id) => this.dao.getId(id);
  createUser = (user) => this.dao.create(user);
  updateUser = (uid, user) => this.dao.update({ _id: uid }, user);
  getAll = () => this.dao.find();
  deleteUserId = (id) => this.dao.deleter(id);
}

module.exports = UserService;
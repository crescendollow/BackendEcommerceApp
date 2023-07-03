const { usersServices } = require("../service/index");

const getUsersBd = async (req, res) => {
  try {
    const users = await usersServices.getAll()

    return res.json({
      status: "Sucess",
      playload: users,
    })
  } catch (error) {
    return res.json({
      status: "Error",
      playload: "Error trying to show Users",
    })
  }
};

const getUserIdBd = async (req, res) => {
  try {
    const id = req.params.id
    const getUserId = await usersServices.getUserId(id)
    return res.json({
      status: "Sucess",
      playload: getUserId,
    })
  } catch (error) {
    return res.json({
      status: "Error",
      playload: "Error trying to get User",
    })
  }
}

const addUserBd = async (req, res) => {
  try {
    const user = req.body;
    const newuser = await usersServices.createUser(user)
    return res.json({
      status: "Sucess",
      playload: newuser,
    })
  } catch (error) {

    return res.json({
      status: "error",
      playload: "Error creating User",
    })
  }
}

const updateUserBd = async (req, res) => {
  try {
    const id = req.params.id
    const user = req.body
    const UpdateUserId = await usersServices.updateUser(id,user)
    return res.json({
      status: "Sucess",
      playload: updateUserBd,
    })
  } catch (error) {
    return res.json({
      status: "error",
      playload: "Error updating User",
    })
  }
}

const deleteUserBd = async (req, res) => {
  try {
    const id = req.params.id
    const deleteuser = await usersServices.deleteUserId(id)
    return res.json({
      status: "Sucess",
      playload: deleteproduct,
    })
  } catch (error) {
    return res.json({
      status: "erorr",
      playload: "error al eliminar producto",
    })
  }
}

module.exports = {
  getUsersBd,
  getUserIdBd,
  addUserBd,
  updateUserBd,
  deleteUserBd,
}
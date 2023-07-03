const session = require("express-session");
const UserService = require("../service/users.service");

const viewsBd = async (req, res) => {

    const showUser = await UserService.getUserId(res.query)
    const user = showUser.docs.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        rol: user.rol
    }

    ))

    res.render("viewUser", {
        firstName: user.firstName,
        lastName: user.lastName,
        rol: user.rol,
        sessions: req.session
    }

    )
}

module.exports = {
    viewsBd,
}
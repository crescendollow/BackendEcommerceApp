const passport = require("passport");
const passportLocal = require("passport-local");
const { hashPassword, comparePassword } = require("./hashPassword");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { generateToken } = require("./jwt");
const {
  COOKIE_USER,
  JWT_STRATEGY,
  REGISTER_STRATEGY,
  LOGIN_STRATEGY,
  PRIVATE_KEY_JWT,
} = require("../config/config");
const { sesionServices } = require("../service");

const cookieEstractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[COOKIE_USER];
  }
  return token;
};

const initPassaport = () => {
  passport.use(
    JWT_STRATEGY,
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieEstractor]),
        secretOrKey: PRIVATE_KEY_JWT,
      },
      async (jwt_payload, done) => {
        try {
          const { payload } = jwt_payload;
          const user = await sesionServices.getUserId(payload.id);
          done(null, { user });
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    REGISTER_STRATEGY,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { firstName, lastName, age } = req.body;

        try {
          const exitEmail = await sesionServices.getEmail({ email: username });
          if (exitEmail) {
            done("register Error", false, {
              message: "Usuario Existente con ese Emial",
            });
          } else {
            const hash = await hashPassword(password);
            if (username === "adminCoder@coder.com") {
              const user = await sesionServices.createUser({
                firstName: firstName,
                lastName: lastName,
                age: age,
                email: username,
                password: hash,
                rol: "administrador",
              });
              done(null, user);
            } else {
              const user = await sesionServices.createUser({
                firstName: firstName,
                lastName: lastName,
                age: age,
                email: username,
                password: hash,
              });

              done(null, user);
            }
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    LOGIN_STRATEGY,
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const user = await sesionServices.getEmail({ email: username });
          const isVadidPassword = await comparePassword(
            password,
            user.password
          );
          if (user && isVadidPassword) {
            const token = generateToken({ id: user.id, rol: user.rol });
            if (token) {
              done(null, { token: token });
            } else {
              done(null, false);
            }
          } else {
            done(null, false);
          }
        } catch (error) {
          done(null, false);
        }
      }
    )
  );
};

module.exports = initPassaport;

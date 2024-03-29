const { User } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.password, req.body.password))
    ) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res
      .status(401)
      .send({ status: 'Error', response: 'Incorrect email or password.' })
  } catch (error) {
    res.status(500).send({
      status: 'Error',
      msg: `${error.errors[0].type}: ${error.errors[0].message}`
    })
  }
}

const Register = async (req, res) => {
  try {
    const { username, email, password, userSettings } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      username,
      email,
      password: passwordDigest,
      user_settings: userSettings
    })
    res.send(user)
  } catch (error) {
    res.status(500).send({
      status: 'Error',
      msg: `${error.errors[0].type}: ${error.errors[0].message}`
    })
  }
}

const CheckSession = async (req, res) => {
  // console.log(res.locals)
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Login,
  Register,
  CheckSession
}

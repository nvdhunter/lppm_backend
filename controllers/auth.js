const HTTPStatus = require("http-status");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  const loginQuery =
    "SELECT * FROM user as u JOIN role as r ON r.id_role = u.id_role WHERE u.username = ? LIMIT 1";

  results = await req.db.asyncQuery(loginQuery, [username]);
  if (results.length == 0) {
    res.status(HTTPStatus.UNAUTHORIZED).send({ error: "User tidak ditemukan" });
    return;
  }
  let user = results[0];
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(HTTPStatus.UNAUTHORIZED).send({ error: "Password salah" });
    return;
  }

  req.session.user = user;
  delete user.password;
  res.status(HTTPStatus.OK).send(user);
};

const onlyAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    res.status(HTTPStatus.UNAUTHORIZED).send({ error: "Belum login" });
    return;
  }
  next();
};

const onlyRoles = nama_roles => (req, res, next) => {
  if (!req.session.user) {
    res.status(HTTPStatus.UNAUTHORIZED).send({ error: "Belum login" });
    return;
  }
  if (!nama_roles.find(e => e == req.session.user.nama_role)) {
    res.status(HTTPStatus.FORBIDDEN).send({ error: "Tidak punya akses" });
    return;
  }
  next();
};

const logout = async (req, res) => {
  req.session.destroy();
  res.status(200).send({});
};

module.exports = {
  login,
  onlyAuthenticated,
  onlyRoles,
  logout
};

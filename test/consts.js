const ADMIN_CRED = {
  username: "admin",
  password: "wasdwasd",
  nama_role: "Dosen",
};

const DOSEN1_CRED = {
  username: "dosen1",
  password: "wasdwasd",
  nama_role: "Dosen",
};

const UNKNOWN_CRED = {
  username: "unkwon_credential",
  password: "wasdwasd",
  role: null,
};

const WRONG_CRED = {
  username: "admin",
  password: "wrong_password",
  nama_role: "Admin",
};

const TAHAP_LENGTH = 9;
const ROLE_LENGTH = 2;

module.exports = {
  ADMIN_CRED,
  DOSEN1_CRED,
  UNKNOWN_CRED,
  WRONG_CRED,
  TAHAP_LENGTH,
  ROLE_LENGTH,
};

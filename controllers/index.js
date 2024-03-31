const auth = require("../controllers/auth");
const uploads = require("../controllers/uploads");
const usuario = require("../controllers/usuarios");

module.exports = {
    ...auth,
    ...uploads,
    ...usuario,
}
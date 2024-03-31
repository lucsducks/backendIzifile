const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos,validarArchivoSubir } = require("../middlewares/");
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary, mostrarImagenCloudinary } = require("../controllers/");
const {
  coleccionesPermitidas,
  existeUsuarioPorId,
} = require("../helpers/");

const router = Router();

router.post("/", [validarArchivoSubir, validarCampos], cargarArchivo);
router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "No es un ID válido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary
);
// router.get(
//   "/:coleccion/:id",
//   [
//     check("id", "No es un ID válido").isMongoId(),
//     check("coleccion").custom((c) =>
//       coleccionesPermitidas(c, ["usuarios", "productos"])
//     ),
//     validarCampos,
//   ],
//   mostrarImagenCloudinary
// );

module.exports = router;

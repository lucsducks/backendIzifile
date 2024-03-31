const path = require("path");
const fs = require("fs");

const { v4 } = require("uuid");
const { response } = require("express");
const cloudinary = require("cloudinary").v2;

const { subirArchivo } = require("../helpers/");
const { Usuario, Producto } = require("../models/");

cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async (req, res = response) => {
  try {
    const pathArchivo = await subirArchivo(req.files, ["txt", "md"], "textos");
    res.json({
      nombre: pathArchivo,
    });
  } catch (msg) {
    res.status(400).json({ errors: [{ msg }] });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ errors: [{ msg: `No existe usuario con id ${id}` }] });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ errors: [{ msg: `No existe producto con id ${id}` }] });
      }
      break;
    default:
      return res.status(500).json({ errors: [{ msg: "No valide esa opción. Comuníquese con el administrador" }] });
  }

  // Limpiar imágenes previas
  if (modelo.img) {
    const pathImagen = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const pathArchivo = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = pathArchivo;
  await modelo.save();
  res.json(modelo);
};

const actualizarImagenCloudinary = async (req, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ errors: [{ msg: `No existe usuario con id ${id}` }] });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ errors: [{ msg: `No existe producto con id ${id}` }] });
      }
      break;
    default:
      return res.status(500).json({ errors: [{ msg: "No valide esa opción. Comuníquese con el administrador" }] });
  }

  // Eliminar imagen anterior de Cloudinary
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    await cloudinary.uploader.destroy(public_id);
  }

  // Subir nueva imagen a Cloudinary
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;
  await modelo.save();
  res.json(modelo);
};

const mostrarImagen = async (req, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ errors: [{ msg: `No existe usuario con id ${id}` }] });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ errors: [{ msg: `No existe producto con id ${id}` }] });
      }
      break;
    default:
      return res.status(500).json({ errors: [{ msg: "No valide esa opción. Comuníquese con el administrador" }] });
  }

  if (modelo.img) {
    const pathImagen = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const imagenRelleno = path.join(__dirname, "../assets/no-image.jpg");
  return res.sendFile(imagenRelleno);
};

const mostrarImagenCloudinary = async (req, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ errors: [{ msg: `No existe usuario con id ${id}` }] });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ errors: [{ msg: `No existe producto con id ${id}` }] });
      }
      break;
    default:
      return res.status(500).json({ errors: [{ msg: "No valide esa opción. Comuníquese con el administrador" }] });
  }

  // Si el modelo tiene una imagen en Cloudinary, simplemente envía la URL segura como respuesta
  if (modelo.img) {
    return res.send(modelo.img);
  }

  // Si no hay imagen en Cloudinary, envía una imagen de relleno
  const imagenRelleno = path.join(__dirname, "../assets/no-image.jpg");
  return res.sendFile(imagenRelleno);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  actualizarImagenCloudinary,
  mostrarImagen,
  mostrarImagenCloudinary,
};

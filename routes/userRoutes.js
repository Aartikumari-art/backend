const express = require('express');
const routes = express.Router();
const { handleRegister, handleLogin, handleContact } = require('../controllers/user');



routes.post("/register", handleRegister)

routes.post("/login", handleLogin);

routes.post("/contact" , handleContact)


module.exports = routes;
const express = require("express");
const app = express();
const UserController = require("../controller/user-controller");

const router = express.Router();


router.post('/signup',UserController.CreateUser);

router.post('/signin',UserController.signin);

router.get('/refresh',UserController.refreshAccestoken);

router.get('/validate',UserController.validate);

module.exports= router;
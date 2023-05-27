const express = require("express");
const app = express();
const UserController = require("../controller/user-controller");
const {ValidateSignin, ValidateSignup, ValidateToken} = require("../middlewares/index");

const router = express.Router();


router.post('/signup',ValidateSignup.validateSignup  ,UserController.CreateUser);

router.post('/signin',ValidateSignin.validateSignin, UserController.signin);

router.get('/refresh',ValidateToken.validateToken,UserController.refreshAccestoken);

router.get('/validate',ValidateToken.validateToken,UserController.validate);

module.exports= router;
const express = require("express");
const app = express();
const UserController = require("../controller/user-controller");
const {ValidateSignin, ValidateSignup, ValidateToken} = require("../middlewares/index");

const router = express.Router();

// signup point
router.post('/signup',ValidateSignup.validateSignup  ,UserController.CreateUser);
// signin point
router.post('/signin',ValidateSignin.validateSignin, UserController.signin);
// refresh the access token
router.get('/refresh',ValidateToken.validateToken,UserController.refreshAccestoken);
// validate the access tokren
router.get('/validate',ValidateToken.validateToken,UserController.validate);

module.exports= router;
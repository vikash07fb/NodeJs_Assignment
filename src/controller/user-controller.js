const UserService = require("../service/user-service");


const userService = new UserService();


const CreateUser = async function(req,res){
    try {
        // console.log(req.body);
        const user =await userService.CreateUser(req.body);

        return res.status(201).json({
            data : user,
            success : true ,
            message : "Successful sign up"

        })


    } catch (error) {
        return res.status(500).json({
            data : "",
            success : false,
            err : error 
        })
     
    }
}

const signin = async function(req,res){
    try {
        const response = await userService.signin({email: req.body.email, password : req.body.password});

        return res.status(201).json({
            data : response,
            success: true,
            message : "Succesfull signin",
            err : {}
        });

    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            err : {error}
        })
    }
}


const refreshAccestoken= async function(req,res){
    try {
         
        // console.log(req.headers.x_token);
        const response = await userService.refreshAccestoken(req.headers.x_token);
        console.log(response);

        return res.status(200).json({
            data : response,
            success : true,
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            err : {error}
        })
    }
}

const validate = async function (req,res){
    try {
        const response = await userService.validateAccestoken(req.headers.x_token);
        console.log(response);

        return res.status(200).json({
            data : response,
            success : true,
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            err : {error}
        })
    }
}
module.exports= {
    CreateUser,
    signin,
    refreshAccestoken,
    validate
}
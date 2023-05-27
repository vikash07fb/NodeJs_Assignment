
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const validateSignup = async function(req,res,next){
    if(!req.body.email || !req.body.password || !req.body.name)
    {
        return res.status(400).json({
            success: false,
            message : "Please provide the mandatory inputs for the signup process",
            err : "Someting missing in the credintals"
        })
    }
    if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({
            success: false,
            message : "Please provide a valid email address",
            err : "Wrong email format"
        })
    }
    let password= req.body.password;
    if(password.length<=3)
    {
        return res.status(400).json({
            success: false,
            message : "Lenght of the password must be greater tha 3 ",
            err : "Validation Error"
        })
    }
    next();
}

module.exports= {validateSignup}
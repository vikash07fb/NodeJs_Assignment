
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const validateSignin = async function(req,res,next){
    if(!req.body.email || !req.body.password)
    {
        return res.status(400).json({
            success: false,
            message : "Please provide the mandatory inputs for the signin",
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

    next();
}

module.exports= {validateSignin}
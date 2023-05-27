const { SALT } = require('../config/serverConfig');
const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserRepository {


    async CreateUser(data){
        try {
            // console.log(data);
            const encryptedPassword = bcrypt.hashSync(data.password,SALT);
            data.password=encryptedPassword;
            let chuser = await User.findOne({ email: data.email });
            if (chuser) {

                 throw({ error: "Sorry a user with this email already exists" });
            }

            // console.log(data.password);
            const name = data.name;
            const email = data.email;
            const password = data.password;
            // Create a new user
            const user =await User.create({
               name, email, password
            });

            // console.log(user);
            return user;
        } catch (error) {
            console.log(error);

            console.log("Something went wrong repo layer");
            throw error;
        }
        
    }

    async getByEmail({email}){
        try {
            console.log({email});
            const user =await User.findOne({email});
            // console.log(user);
            if(user==null)
            {
                throw({error: "User with this email id doesnot exists"});
            }

            return user ;
        } catch (error) {
            console.log("Something went wrong repo layer");
            throw error;
        }
    }
}

module.exports = UserRepository
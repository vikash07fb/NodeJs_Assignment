const UserRepository = require("../repository/user-repo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async CreateUser(data) {
        // console.log(data);
        const { name, email, password } = data;
        const user = await this.userRepository.CreateUser(data);

        console.log(user.email);
        const accesToken = await this.generateAccessToken({ email });
        const refreshToken = await this.generateRefreshToken({ email });

        console.log(accesToken);
        console.log(refreshToken);

        return { accesToken, refreshToken };

    }

    async signin(data) {
        try {
            console.log(data);
            const { name, email, password } = data;
            const user = await this.userRepository.getByEmail({ email });


            // console.log(user);

            const passwordMatch = await this.checkPassword(data.password, user.password);
            if (!passwordMatch) {
                console.log("Wrong password entered");
                throw ({ error: "Wrong password" });
            } else {
                console.log("password matched")
            }

            const accesToken = this.generateAccessToken({ email });
            const refreshToken = this.generateRefreshToken({ email });

            return { accesToken, refreshToken };



        } catch (error) {
            console.log(`Something went wrong in service layer`);
            throw ({ error });
        }
    }
    checkPassword(plainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(plainPassword, encryptedPassword);

        } catch (error) {
            console.log(`Password does not matches`);
            throw ({ error: "Invalid password" })
        }
    }


    // Generate an access token
    generateAccessToken(payload) {
        try {
            // this token get expired in 15 minutes
            const result = jwt.sign(payload, JWT_KEY, { expiresIn: '15m' });
            return result;

        } catch (error) {
            console.log("Someting wrong in access token");
            throw error;
        }

    }

    // Generate a refresh token
    generateRefreshToken(payload) {
        try {
            // this token will expired in a day i.e 24 hours
            const result = jwt.sign(payload, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
            console.log("Someting wrong in refresh token");
            throw error;
        }
    }


    // RefreshAccesstoken 


    async refreshAccestoken(refreshToken) {
        try {
          
            // console.log(refreshToken);
            // Verify the refresh token
        //   await  jwt.verify(refreshToken, JWT_KEY, (err, decoded) => {
        //         if (err) {
        //            throw({ error: 'Invalid refresh token' });
        //         }
    
        //         // Generate a new access token
        //         const accessToken = this.generateAccessToken({ email: decoded.email });
        //         return accessToken;
        //     }
        //     )

        const result = await jwt.verify(refreshToken,JWT_KEY);
        console.log(result);
        const {email,iat,exp} = result;
        const accesToken = this.generateAccessToken({ email });
        

        return {accesToken};
        } catch (error) {
            console.log("Someting wrong refressing the token ");
            throw error;
        }

    }
    async validateAccestoken(accessToken){
        try {
            const result = await jwt.verify(accessToken,JWT_KEY);
            return result;
        } catch (error) {
            console.log("Someting wrong in validating the token ");
            throw error;
        }
    }
}

module.exports = UserService
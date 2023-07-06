const {UnauthorizedError} =  require("../utils/errors")

class User{
    static async login(credentials){
        throw new UnAuthorizedError("Invalid email/password combo")
    }

    static async register(credentials){

    }
}

module.exports = User
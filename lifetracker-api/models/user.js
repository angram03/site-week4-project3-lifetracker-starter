const bcrypt = require("bcrypt")
const db = require("../db")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError, UnauthorizedError} =  require("../utils/errors")
class User{
    static async login(credentials){
        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials){
        const requiredFields = ["email", "password", "firstName", "lastName", "userName", "passwordConfirm"]
        requiredFields.forEach(field =>  {
        if (!credentials.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        }

    })

    if (credentials.email.indexOf("@") <= 0) {
        throw new BadRequestError("Invalid email.")
    }

    const existingUser = await User.fetchUserByEmail(credentials.email)
    if (existingUser) {
        throw new BadRequestError(`Duplicate email: ${credentials.email}`)

    }
    const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
    const lowercasedEmail = credentials.email.toLowerCase()
    const result = await db.query(`
        INSERT INTO users (
            email,
            password,
            firstName,
            lastName,
            passwordConfirm,
            userName
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, userName, firstName, lastName, passwordConfirm, created_at;
           `, [lowercasedEmail, hashedPassword, credentials.userName, credentials.firstName, credentials.lastName, credentials.passwordConfirm ])
        const user = result.rows[0]
        return user
}

    static async fetchUserByEmail(email){
        if(!email) {
            throw new BadRequestError("New email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]
        return user
    }
}

module.exports = User
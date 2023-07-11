const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")

class Nutrition {
    static async listNutritions(){
        const results = await db.query(
            `
            SELECT n.id,
                   n.name,
                   n.calories,
                   n.image_url AS "imageUrl",
                   n.user_id AS "userId",
                   u.email AS "userEmail",
                   n.created_at AS "createdAt",
                   n.updated_at AS "updatedAt"


            FROM nutrition AS n
                JOIN users AS u ON u.id = n.user_id
            ORDER BY n.created_at DESC

            `
        )
        return results.rows
    }


    static async fetchNutritionById(nutritionId) {
        
        const results = await db.query(
            `
            SELECT n.id,
                   n.name,
                   n.calories,
                   n.image_url AS "imageUrl",
                   n.user_id AS "userId",
                   u.email AS "userEmail",
                   n.created_at AS "createdAt",
                   n.updated_at AS "updatedAt"


            FROM nutrition AS n
                JOIN users AS u ON u.id = n.user_id
            WHERE n.id = $1

            `, [nutritionId]
        )

        const nutrition = results.rows[0]
        if(!nutrition) {
            throw new NotFoundError()
        }
        return nutrition
    }

    static async createNewNutrition({nutrition, user}){
        const requiredFields = ["name", "calories", "imageUrl"]
        requiredFields.forEach(field => {
            if(!nutrition.hasOwnProperty(field)) {
            throw new BadRequestError(`Required field - ${field} - missing from request body`)
            }
        })

        if (nutrition.name.length > 140) {
            throw new BadRequestError(`Nutrition name must be 140 characters or less`)
        }
        const results = await db.query(
            `
            INSERT INTO nutrition (name, calories, image_url, user_id)
            VALUES ($1, $2, $3, (SELECT id FROM users WHERE email = $4))
            RETURNING id,
                      name,
                      calories,
                      image_url AS "imageUrl",
                      user_id AS "userId",
                      created_at AS "createdAt",
                      updated_at AS "updatedAt"
            `, [nutrition.name, nutrition.calories, nutrition.imageUrl, user.email]
        )
        return results.rows[0]
    }

    static async editNutrition({nutritionId, nutritionUpdate}) {
        const requiredFields = ["name"]
        requiredFields.forEach((field) => {
            if(!nutritionUpdate.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body`)
            }

        })
        const results = await db.query(
            `
            UPDATE nutrition
            SET name = $1,
                updated_at = NOW()
            WHERE id = $2
            RETURNING id,
                      name,
                      calories,
                      image_url AS "imageUrl",
                      user_id AS "userId",
                      created_at AS "createdAt",
                      updated_at AS "updatedAt"

            `, [nutritionUpdate.name, nutritionId]
        )
        return results.rows[0]
    }
    

}

module.exports = Nutrition


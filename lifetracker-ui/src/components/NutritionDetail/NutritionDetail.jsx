import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import {formatDate} from "../../utils/format"
import "./NutritionDetail.css"

const fetchNutritionById = async ({nutritionId, setIsFetching, setError, setNutrition, setName }) => {
  setIsFetching(true)

  try {
    const res = await axios.get(`http://localhost:3001/nutrition/${nutritionId}`)
    if (res?.data?.nutrition) {
      setNutrition(res.data.nutrition)
      setName(res.data.nutrition.name)
    } else {
      setError("Something went wrong fetching the post.")
    }
  } catch (err) {
    console.log(err)
    const message = err?.response?.data?.error?.message
    setError(message ?? String(err))
  } finally {
    setIsFetching(false)
  }
}

export default function NutritionDetail({ user }) {
  const { nutritionId } = useParams()
  const [nutrition, setNutrition] = useState(null)
  const [name, setName] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNutritionById({ nutritionId, setIsFetching, setError, setNutrition, setName })
  }, [nutritionId])

  const handleOnUpdate = async () => {
    setIsUpdating(false)

    try {
      const res = await axios.patch(`http://localhost:3001/nutrition/${nutritionId}`)
      if (res?.data?.nutrition) {
        setNutrition({ nutrition, name: res.data.nutrition.name})
      } else {
        setError("Something went wrong fetching the nutrition.")
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setError(message ?? String(err))
    } finally {
      setIsUpdating(false)
    }
  }



  const userIsLoggedIn = Boolean(user?.email)
  const userOwnsNutrition = userIsLoggedIn && nutrition?.userEmail === user?.email

  if (!nutrition && !isFetching) return null
  if (!nutrition) return <h1>Loading...</h1>

  return (
    <div className="NutritionDetail">
      <div className="NutritionPage">
        <div
          className="media"
          style={{
            backgroundImage: `url(${nutrition.imageUrl})`,
          }}
          to={`/nutrition/${nutrition.id}`}
        />

        <div className="body">
          <div className="info">
            <p className="name">{nutrition.name}</p>
          </div>

          <div className="meta">
            <span className="date">{formatDate(nutrition.createdAt)}</span>
            <span className="user">{nutrition.userEmail}</span>
          </div>
        </div>
      </div>

      {error && <span className="error">Error: {error}</span>}

      <div className="actions">
        {userOwnsNutrition? (
          <div className="edit-nutrition">
            <p>Edit your nutrition</p>
            <textarea value={name} onChange={(event) => setName(event.target.value)} name="name"></textarea>
            <button className="btn" onClick={handleOnUpdate}>
              {isUpdating ? "Loading..." : "Save Nutrition"}
            </button>
          </div>
        ) : (
          <div className="rate-setup">
            <p>Rate this setup</p>
            <button className="btn" onClick={handleOnUpdate} disabled={!userIsLoggedIn}>
              {isUpdating ? "Loading..." : "Save Nutrition"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
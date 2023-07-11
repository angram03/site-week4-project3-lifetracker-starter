import { useState } from "react"
import axios from "axios"
import NotAllowed from "../NotAllowed/NotAllowed"
import "./NewNutritionForm.css"

export default function NewNutritionForm({ user, addNutrition }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: "",
    calories: "",
    imageUrl: "",
  })

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    console
    setIsLoading(true)

    try {
      const res = await axios.nutrition(`http://localhost:3001/nutrition`, form)
      if (res?.data?.nutrition) {
        addNutrition(res.data.nutrition)
        setForm({ name: "", calories:"", imageUrl: "" })
      } else {
        setError("Something went wrong with nutrition creation.")
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setError(message ?? String(err))
    } finally {
      setIsLoading(false)
    }
  }

  const renderForm = () => {
    if (!user) {
      return <NotAllowed />
    }
    return (
      <div className="form">
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="caption"
            placeholder="A  name here"
            value={form.name}
            onChange={handleOnInputChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="calories">Calories</label>
          <input
            type="text"
            name="calories"
            placeholder="calories"
            value={form.calories}
            onChange={handleOnInputChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="The image URL for u "
            value={form.imageUrl}
            onChange={handleOnInputChange}
          />
        </div>

        <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    )
  }

  return (
    <div className="NewNutritionForm">
      <div className="card">
        <h2>Create a new nutrition</h2>

        {Boolean(error) && <span className="error">{error}</span>}

        {renderForm()}
      </div>
    </div>
  )
}
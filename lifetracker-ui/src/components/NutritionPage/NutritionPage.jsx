import { Link } from "react-router-dom";
import "./NutritionPage.css";
import NewNutritionForm from "../NewNutritionForm/NewNutritionForm";

export default function NutritionPage({
  appState,
  nutrition,
  addNutrition,
  isFetching,
  error,
}) {
  console.log(appState)
  let user = localStorage.getItem("user")
  console.log(user)
  const userOwnsNutrition = user ? true : false
  return (
    <div className="NutritionPage">
      <h1>nutrition</h1>
      <div className="NutritionPage">
        <NewNutritionForm user={user} addNutrition={addNutrition} />

        <Link
          className="media"
          style={{
            backgroundImage: `url(${nutrition.imageUrl})`,
          }}
          to={`/nutrition/${nutrition.id}`}
        ></Link>

        <div className="body">
          <div className="info">
            <p className="name">{nutrition.name}</p>
          </div>

          <div className="meta">
            <span className="user">
              {userOwnsNutrition ? "You" : nutrition.userEmail}
              {userOwnsNutrition ? (
                <Link to={`/nutrition/${nutrition.id}`}>
                  <i className="material-icons">edit</i>
                </Link>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import "./Home.css";
import Middle from "../../middle/Middle";

export default function Home() {
  return (
    <div>
      <section class="hero-container">
        <div className="Content">
          <h1>LifeTracker</h1>
          <p>Helping you take back control of your world.</p>
        </div>
        <div className="image-div">
          <img
            className="image"
            src="https://lifetracker.up.railway.app/assets/tracker-2a96bfd0.jpg"
            alt=""
          />
        </div>
      </section>
      <Middle />
    </div>
  );
}

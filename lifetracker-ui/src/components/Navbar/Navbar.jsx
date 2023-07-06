import "./Navbar.css"
export default function Navbar () {
    return (
        <div>
            <nav className="nav">
                <h1 className="title">LifeTracker</h1>
                <ul>
                    <li>
                        <a href="/home">HOME</a>
                    </li>
                    <li>
                        <a href="/activity">ACTIVITY</a>
                    </li>
                    <li>
                        <a href="/exercise">EXERCISE</a>
                    </li>
                    <li>   
                        <a href="/nutrition">NUTRITION</a>
                    </li>
                    <li>
                        <a href="/sleep">SLEEP</a>  
                    </li>      
                    <li>
                        <a href="/login"><button className="log">LOGIN</button></a>
                    </li>
                    <li>
                        <a href="/register"><button className="reg">REGISTER</button></a>
                    </li>
                </ul>
            </nav>
        </div>
        

        
    )

}
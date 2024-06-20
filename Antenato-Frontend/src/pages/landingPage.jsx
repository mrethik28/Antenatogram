import { Link } from "react-router-dom"


const LandingPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <ul>
                <li>
                    <Link to={'/dashboard'}>Dashboard</Link>
                </li>
            </ul>
        </section>
    )
}

export default LandingPage
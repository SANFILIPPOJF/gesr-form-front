import { NavLink } from "react-router-dom";

export function Accueil() {
    return (
        <><div>
            <nav className="mb-4">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            Accueil
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/connexion">
                            Connexion
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
            <div>
                <h1 className="accueil" style={{ fontSize: "5rem", color: "teal" }}>accueil</h1>
            </div></>
    )
};
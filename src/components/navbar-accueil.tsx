import { NavLink } from "react-router-dom";
export function NavbarAccueil() {
    return (
        <div>
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
    )
}
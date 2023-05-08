import { NavLink } from "react-router-dom";
export function NavbarManagement() {
    return (
        <div>
            <nav className="mb-4">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/management">
                            Les Formations
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/management/new">
                            Nouvelle Formation
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
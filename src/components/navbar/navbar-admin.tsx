import { NavLink } from "react-router-dom";

export function NavbarAdmin() {
    return (
        <div>
            <nav className="mb-4">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin">
                            Les Agents
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/residences">
                            Les Résidences
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/fonctions">
                            Les Fonctions
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/types">
                            Les Types de formation
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/salles">
                            Les Salles de formation
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/habilitations">
                            Les Habilitations
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
};


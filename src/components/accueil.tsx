import { NavbarAccueil } from "./navbar-accueil";
import { Titre } from "./titre";

export function Accueil() {
    return (
        <><Titre></Titre>
            <NavbarAccueil></NavbarAccueil>
            <div>
                <h1 className="accueil" style={{ fontSize: "5rem", color: "teal" }}>accueil</h1>
            </div>
        </>
    )
};
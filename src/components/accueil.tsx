import { NavbarAccueil } from "./navbar/navbar-accueil";
import { Titre } from "./titre";

export function Accueil() {
    return (
        <><Titre></Titre>
            <NavbarAccueil></NavbarAccueil>
            <div>
                <img src="images/EIGS.jpg" className="img-fluid" alt="eigs" />
                <h1 className="accueil" style={{ fontSize: "5rem", color: "teal" }}>accueil</h1>
            </div>
        </>
    )
};
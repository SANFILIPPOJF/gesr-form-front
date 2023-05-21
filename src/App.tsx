import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Connexion } from './components/connexion';
import { AuthContext } from './context/auth-context';
import { Accueil } from './components/accueil';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Connected } from './components/connected';
import { User } from './types/user_type';
import { DEFAULT_USER } from './constants/default_user';
import { Admin } from './components/mode-admin';
import { Management } from './components/mode-management';
import { DEFAULT_RESIDENCE } from './constants/default_residence';
import { DEFAULT_FONCTION } from './constants/default_fonction';
import { Residence } from './types/residence_type';
import { Fonction } from './types/fonction_type';

const App = () => {
  const [connected, setConnected] = useState<User>(DEFAULT_USER);
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [users, setUsers] = useState<User[]>([]);
  const [residence, setResidence] = useState<Residence>(DEFAULT_RESIDENCE);
  const [residences, setResidences] = useState<Residence[]>([]);
  const [fonction, setFonction] = useState<Fonction>(DEFAULT_FONCTION);
  const [fonctions, setFonctions] = useState<Fonction[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{
      connected, setConnected,
      reload, setReload,
      user, users, setUser, setUsers,
      residence, residences, setResidences, setResidence,
      fonction, fonctions, setFonctions, setFonction
    }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Accueil></Accueil>}></Route>
            <Route path="/connexion" element={connected.token === "" ? <Connexion /> : <Navigate to="/connected" />}></Route>
            <Route path="/connected" element={connected.token !== "" ? <Connected /> : <Navigate to="/" />}></Route>
            <Route path="/admin" element={connected.token !== "" ? <Admin /> : <Navigate to="/" />}></Route>
            <Route path="/admin/agents" element={connected.token !== "" ? <Admin /> : <Navigate to="/" />}></Route>
            <Route path="/admin/residences" element={connected.token !== "" ? <Admin /> : <Navigate to="/" />}></Route>
            <Route path="/admin/fonctions" element={connected.token !== "" ? <Admin /> : <Navigate to="/" />}></Route>
            <Route path="/admin/types-form" element={connected.token !== "" ? <Admin /> : <Navigate to="/" />}></Route>
            <Route path="/admin/salles" element={connected.token !== "" ? <Admin /> : <Navigate to="/" />}></Route>
            <Route path="/admin/habilitations" element={connected.token !== "" ? <Admin /> : <Navigate to="/" />}></Route>
            <Route path="/management" element={connected.token !== "" ? <Management /> : <Navigate to="/" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}
export default App;

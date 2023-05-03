import { useContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Titre } from './components/titre';
import { Connexion } from './components/connexion';
import { AuthContext } from './context/auth-context';
import { Accueil } from './components/accueil';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Connected } from './components/connected';
import { LogInfo } from './types/login_type';
import { User } from './types/user_type';
import { DEFAULT_USER } from './constants/default_user';

const App = () => {
  const authContext = useContext(AuthContext);
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const [logInfo, setLogInfo] = useState<LogInfo>({ cp: "", password: "" });
  const [user, setUser] = useState<User>( DEFAULT_USER );
  const [token, setToken] = useState<string>("");
  return (
    <AuthContext.Provider value={{ token: token, isUserLogged: isUserLogged, user: user}}>
      <div className="App">
        <Titre></Titre>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Accueil></Accueil>}></Route>
            <Route path="/connexion" element={!isUserLogged ? <Connexion
              setIsUserLogged={setIsUserLogged}
              setLogInfo={setLogInfo}
              setToken={setToken}
              logInfo={logInfo}></Connexion> : <Navigate to="/connected" />
            }>
            </Route>
            <Route path="/connected" element={isUserLogged ? <Connected></Connected> : <Navigate to="/" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}
export default App;

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
import { Admin } from './components/admin';
import { Management } from './components/management';

const App = () => {

  const [user, setUser] = useState<User>( DEFAULT_USER );

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Accueil></Accueil>}></Route>
            <Route path="/connexion" element={user.token==="" ? <Connexion/> : <Navigate to="/connected" />}></Route>
            <Route path="/connected" element={user.token!=="" ? <Connected/> : <Navigate to="/" />}></Route>
            <Route path="/admin" element={user.token!=="" ? <Admin/> : <Navigate to="/" />}></Route>
            <Route path="/management" element={user.token!=="" ? <Management/> : <Navigate to="/" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}
export default App;

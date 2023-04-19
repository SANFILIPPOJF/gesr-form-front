import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Titre } from './components/titre';
import { Connexion } from './components/connexion';
import { AuthContext } from './context/auth-context';

export interface User {
  cp: string;
  password: string;
}

const App =  () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [page, setPage] = useState<String>("connexion")
  const [user, setUser] = useState<User>({
    cp: "",
    password: ""
});
  return (
    <AuthContext.Provider value={{ token: "", isUserLoggedIn: isUserLoggedIn }}>
    <div className="App">
      <Titre></Titre>
      {page === "connexion" && <Connexion setUser={setUser} user={user}></Connexion>}
    </div>
    </AuthContext.Provider>
  );
}
export default App;
